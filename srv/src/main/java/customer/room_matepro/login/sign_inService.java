package customer.room_matepro.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class sign_inService {
    @Autowired 
     private sign_inDAO signInDAO;
    
    public sign_in AddSignIn(sign_in signIn) {
        return signInDAO.CreateSignIn(signIn);
    }
}
