ppackage always.crossover.utils;

/**
 * Created by Always on 2015/3/11.
 */
public class Var {

    public static final String crossover_key = "isalways";
    public static final String server_images = "http://120.24.223.82:8080/Crossover/images/";
    public static final String server_address = "http://120.24.223.82:8080/Crossover/Api/";

    //user part
    public static final String api_register = server_address + "user/register";
    public static final String api_login = server_address + "user/login";
    public static final String api_changePwd = server_address + "user/changePwd";

    //team part
    public static final String api_team_update = server_address + "team/update";
    public static final String api_team_photo_logo = server_address + "team/photo/logo";
    public static final String api_team_photo_home = server_address + "team/photo/home";
    public static final String api_team_list = server_address + "team/user/@user/list/@pageNow";
    public static final String api_team_players = server_address + "team/teammate/user/@user/team/@TeamID";

    //player part
    public static final String api_player = server_address + "player";
    public static final String api_player_delete = server_address + "player/delete/@PlayerID";

    //device part
    public static final String api_device = server_address + "device";

    //record part
    public static final String api_record = server_address + "record";

    //gallery part
    public static final String api_gallery_create = server_address + "gallery/create";
    public static final String api_gallery_delete = server_address + "gallery/delete/@GalleryID";
    public static final String api_gallery_list = server_address + "gallery/list/@TeamID";

    //arrange part
    public static final String api_arrange_send = server_address + "arrange/send/@sender/@receiver";
    public static final String api_arrange_receive = server_address + "arrange/receive/@ArrangeID/@Status";
    public static final String api_arrange_list = server_address + "arrange/list/@TeamID";
    public static final String api_arrange_delete = server_address + "arrange/delete/@ArrangeID";

    //photo address
    public static final String img_team_logo = server_images + "TeamLogo/";
    public static final String img_team_home = server_images + "TeamHome/";
    public static final String img_team_teammate = server_images + "Teammate/";
    public static final String img_gallery = server_images + "Gallery/";
}
