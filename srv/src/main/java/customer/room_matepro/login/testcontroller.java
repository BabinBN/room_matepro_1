package customer.room_matepro.login;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;





@RestController
@RequestMapping("/test")
public class testcontroller {

    @GetMapping
    public String test() {
        return "It works!";
    }
}
