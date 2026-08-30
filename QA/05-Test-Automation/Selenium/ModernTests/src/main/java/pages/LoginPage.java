package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class LoginPage extends BasePage {
    private final By emailInput = By.id("email");
    private final By passwordInput = By.id("password");
    private final By signInButton = By.xpath("//button[@type='submit' and normalize-space()='Sign in']");
    private final By createAccountButton = By.xpath("//button[normalize-space()='Create one']");
    private final By emailError = By.xpath("//input[@id='email']/following-sibling::p");
    private final By passwordError = By.xpath("//input[@id='password']/following-sibling::p");
    private final By apiError = By.xpath("//p[contains(@class,'bg-[#2a1410]')]");

    public LoginPage(WebDriver driver) {
        super(driver);
    }

    public LoginPage open() {
        driver.get(config.TestConfig.loginUrl());
        return this;
    }

    public DashboardPage loginAs(String email, String password) {
        type(emailInput, email);
        type(passwordInput, password);
        click(signInButton);
        return new DashboardPage(driver);
    }

    public void submitEmptyForm() {
        click(signInButton);
    }

    public RegistrationPage openRegistration() {
        click(createAccountButton);
        return new RegistrationPage(driver);
    }

    public String emailError() {
        return text(emailError);
    }

    public String passwordError() {
        return text(passwordError);
    }

    public String apiError() {
        return text(apiError);
    }

}
