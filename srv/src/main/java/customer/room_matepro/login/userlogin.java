package customer.room_matepro.login;

import lombok.*;
@Getter
@Setter
@NoArgsConstructor
public class userlogin {
    private String email;
    private String password_pwd;
       public userlogin( String email, String passwordPwd) {
        this.email = email;
         this.password_pwd = passwordPwd;
    }
}
