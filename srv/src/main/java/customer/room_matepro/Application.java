package customer.room_matepro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "customer.room_matepro.login")
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
