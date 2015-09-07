#import "ImageUploadPlugin.h"

@implementation ImageUploadPlugin

@synthesize imageAlertView,imagePickerController,imagePath,imageView,agsimp,savedImage,imageDataStr,imageActionSheet,thread,imageCommand,imageRatio,parser,globalRequest;


-(void) pluginInit
{
    savedImage = [[UIImage alloc]init];
    imagePath = @"";
    imageDataStr = @"";
    imageRatio = 1;
    
}



/*
 * 选择、裁剪图片
 */
-(void)selectImage:(CDVInvokedUrlCommand*) command
{
    imageCommand = command;
    NSString* echo = [command.arguments objectAtIndex:0];
    if (echo != nil && [echo length] > 0) {
        imageRatio = [echo floatValue];
    }
    
    
    [self pluginInit];
    imageAlertView = [[UIAlertView alloc]initWithTitle:@"图片来源" message:@"" delegate:self cancelButtonTitle:@"取消" otherButtonTitles:@"拍照",@"相册选取", nil];
    [imageAlertView show];

}


/*
 * 上传图片
 */
-(void)uploadImage:(CDVInvokedUrlCommand*) command
{
    NSString* uploadUrl = @"";
    imageCommand = command;
    NSString* echo = [command.arguments objectAtIndex:0];
    if (echo != nil && [echo length] > 0) {
        
        uploadUrl = echo;
    }
    [globalRequest setShouldAttemptPersistentConnection:NO];
    globalRequest = [[ASIFormDataRequest alloc]initWithURL:[NSURL URLWithString:uploadUrl]];
    globalRequest.delegate = self;
    
    [globalRequest addFile:imagePath forKey:@"file"];
    NSUserDefaults *userDefaults = [NSUserDefaults standardUserDefaults];
    NSString* userKey = [userDefaults objectForKey:@"userKey"];
    [globalRequest setPostValue:userKey forKey:@"key"];
     globalRequest.defaultResponseEncoding = NSUTF8StringEncoding;
    [globalRequest setTimeOutSeconds:UPLOAD_TIMEOUT_SECONDS];
    [globalRequest setDidFinishSelector:@selector(imageUploadFinish:)];
    [globalRequest setDidFailSelector:@selector(imageUploadFail:)];

    
    
    [globalRequest startAsynchronous];
}

-(void)imageUploadFinish:(ASIHTTPRequest*)request
{
    CDVPluginResult* pluginResult = nil;
    //NSLog(@"%@",[globalRequest responseString]);
    
    parser = [[SBJsonParser alloc]init];
    NSMutableDictionary * dic = [[NSMutableDictionary alloc]initWithDictionary:[parser objectWithString:[request responseString]]];
    NSString* code = [NSString stringWithFormat:@"%@",[dic objectForKey:@"code"]];
    NSString* msg = @"";
    if([code isEqualToString:@"200"]){
        NSString* dataStr = [NSString stringWithFormat:@"%@",[dic objectForKey:@"data"]];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:dataStr];

    }else{
        msg = [dic objectForKey:@"msg"];
        msg= [msg stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:msg];
    }

    [self.commandDelegate sendPluginResult:pluginResult callbackId:imageCommand.callbackId];
}

-(void) imageUploadFail:(ASIHTTPRequest*)request
{
    
    NSString* responseString = [request responseString];
    NSLog(@"%@",responseString);
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"error"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:imageCommand.callbackId];
}


-(void)actionSheet:(UIActionSheet *)actionSheet clickedButtonAtIndex:(NSInteger)buttonIndex
{
    if(buttonIndex==0){
        [self showCamera];
    }else if(buttonIndex==1){
        [self showGallery];
    }else{
    }
    
}
    
    

/*
 * 选择框点击事件
 */
-(void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
    NSLog(@"buttonIndex is : %li",(long)buttonIndex);
    switch (buttonIndex) {
        case 0:{
            
        }break;
        case 1:{
            [self showCamera];
        }break;
        case 2:{
            [self showGallery];
        }break;
        default:
            break;
    }
}

-(void)showCamera
{
    
    if ([UIImagePickerController isSourceTypeAvailable:UIImagePickerControllerSourceTypeCamera])
    {
        imagePickerController = [[UIImagePickerController alloc]init];
        imagePickerController.sourceType = UIImagePickerControllerSourceTypeCamera;
        imagePickerController.delegate = self;
        //[self.viewController.view addSubview: imagePickerController.view];
        [self.viewController presentViewController:imagePickerController animated:YES completion:^{
        }];

    }else{
        NSLog(@"相机不能用。。。");
    }
        
    
}

-(void)showGallery
{
    if ([UIImagePickerController isSourceTypeAvailable:UIImagePickerControllerSourceTypePhotoLibrary])
    {
        imagePickerController = [[UIImagePickerController alloc]init];
        imagePickerController.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
        imagePickerController.delegate = self;
        //[self.viewController.view addSubview: imagePickerController.view];
        [self.viewController presentViewController:imagePickerController animated:YES completion:^{
        }];
        
    }else{
        NSLog(@"相册不能用。。。");
    }
}

-(void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info
{
    @try {
        
        imagePath = [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0]stringByAppendingPathComponent:@"wnsImage.png"];
        UIImage *image = info[UIImagePickerControllerOriginalImage];
        UIImage * images = [self ScaleImage:image ToScale:0.6];
        
        [picker dismissViewControllerAnimated:YES completion:^{
            imageView = [[UIView alloc]initWithFrame:CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width, [UIScreen mainScreen].bounds.size.height)];
            [imageView setBackgroundColor:[UIColor blackColor]];
            agsimp = [[AGSimpleImageEditorView alloc]initWithImage:images];
            agsimp.frame =CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width, [UIScreen mainScreen].bounds.size.height-30);
            //外边框颜色宽度
            agsimp.borderColor = [UIColor blackColor];
            agsimp.borderWidth= 1.0f;
            //截取框颜色宽度
            agsimp.ratioViewBorderColor = [UIColor darkGrayColor];
            agsimp.ratioViewBorderWidth = 4.0f;
            //截取百分比
            agsimp.ratio = imageRatio;
            [imageView addSubview:agsimp];
            UIButton*but = [UIButton buttonWithType:UIButtonTypeRoundedRect];
            but.frame =CGRectMake(20, [UIScreen mainScreen].bounds.size.height-30, [UIScreen mainScreen].bounds.size.width-40, 30);
            [but setTitle:@"保存" forState:UIControlStateNormal];
            [but addTarget:self action:@selector(saveImage) forControlEvents:UIControlEventTouchUpInside];
            [imageView addSubview:but];
            [self.viewController.view addSubview:imageView];
            [self.viewController.view bringSubviewToFront:imageView];
            
        }];
    }
    @catch (NSException *exception) {
        
    }
    @finally {
        
    }
    
}

-(void)saveImage
{
    @try {
        savedImage =agsimp.output;
        //NSLog(@"Image:%@",savedImage);
        NSData * data = UIImagePNGRepresentation(savedImage);
        [data writeToFile:imagePath atomically:YES];
        imageDataStr = [data base64EncodedStringWithOptions:NSDataBase64EncodingEndLineWithLineFeed];
        //NSLog(@"%@",steStr);
        // stestr = [data base64Encoding];
        //[self Asihttp];
        
        CDVPluginResult* pluginResult = nil;
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:imageDataStr];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:imageCommand.callbackId];
        
        [self.viewController.view sendSubviewToBack:imageView];
        [imageView removeFromSuperview];
        [imagePickerController.view removeFromSuperview];
        
        

    }
    @catch (NSException *exception) {
        
    }
    @finally {

    }
    
}

-(UIImage*)ScaleImage:(UIImage*)images ToScale:(float)scalesize{
    CGSize  size = CGSizeMake(images.size.width*scalesize, images.size.height*scalesize);
    UIGraphicsBeginImageContext(size);
    [images drawInRect:CGRectMake(0, 0, images.size.width*scalesize, images.size.height*scalesize)];
    UIImage * scaleImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return scaleImage;
}

@end