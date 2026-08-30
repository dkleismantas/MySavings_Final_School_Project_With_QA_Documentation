package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class RegistrationPage extends BasePage {
    private final By usernameInput = By.id("username");
    private final By emailInput = By.id("email");
    private final By passwordInput = By.id("password");
    private final By confirmPasswordInput = By.id("confirmPassword");
    private final By createAccountButton = By.xpath("//button[@type='submit' and normalize-space()='Create Account']");

    public RegistrationPage(WebDriver driver) {
        super(driver);
    }

    public void register(String username, String email, String password, String confirmPassword) {
        type(usernameInput, username);
        type(emailInput, email);
        type(passwordInput, password);
        type(confirmPasswordInput, confirmPassword);
        click(createAccountButton);
    }

}
