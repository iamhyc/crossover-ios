#import <Foundation/Foundation.h>

#import <Cordova/CDVPlugin.h>

#import "AGSimpleImageEditorView.h"

#import "ASIFormDataRequest.h"

#import "SBJsonParser.h"

#import "Header.h"



@interface ImageUploadPlugin : CDVPlugin<UIAlertViewDelegate,UIImagePickerControllerDelegate,UINavigationControllerDelegate,UIActionSheetDelegate,ASIHTTPRequestDelegate>



@property (nonatomic,strong) UIAlertView* imageAlertView;

@property (nonatomic,strong) UIImagePickerController * imagePickerController;

@property (nonatomic,strong) NSString * imagePath;

@property (nonatomic,strong) UIView * imageView;

@property (nonatomic,strong) AGSimpleImageEditorView * agsimp;

@property (nonatomic,strong) UIImage * savedImage;

@property (nonatomic,strong) NSString * imageDataStr;

@property (nonatomic,strong) UIActionSheet * imageActionSheet;

@property (nonatomic,strong) NSThread* thread;

@property (nonatomic,strong) CDVInvokedUrlCommand* imageCommand;

@property (nonatomic,assign) float imageRatio;

@property (nonatomic,strong) SBJsonParser * parser;

@property (nonatomic,strong) ASIFormDataRequest * globalRequest;


/*

* image Scrop

*/

-(void)selectImage:(CDVInvokedUrlCommand*) command;



/*

* image Upload

*/

-(void)uploadImage:(CDVInvokedUrlCommand*) command;


@end