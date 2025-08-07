package customer.room_matepro.login;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/login")
public class sign_inController {

    @Autowired
    private sign_inService signInService;

    @PostMapping("/signup")
    public sign_in postMethodName(@RequestBody sign_inEntity signIn) {
        return signInService.AddSignIn(signIn);
    }

     @PostMapping("/signin")
    public sign_in getMethodName(@RequestBody userlogin userLogin) {
        return signInService.GetUserByEmailAndPassword(userLogin);
    }

    // public sign_in getUserByEmailAndPassword(@RequestParam String email
    // ,@RequestParam String password ) {
    // return signInService.GetUserByEmailAndPassword(email,password);
    // }
}
