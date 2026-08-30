import config.TestConfig;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import pages.DashboardPage;
import pages.LoginPage;
import pages.RegistrationPage;

import static org.assertj.core.api.Assertions.assertThat;

class AuthTest extends BaseUiTest {
    @Test
    void validUserCanLogInAndLogOut() {
        DashboardPage dashboard = new LoginPage(driver)
                .open()
                .loginAs(TestConfig.testEmail(), TestConfig.testPassword());

        assertThat(dashboard.isLoaded()).isTrue();

        dashboard.logout();

        assertThat(driver.getCurrentUrl()).endsWith("/login");
    }

    @Test
    void emptyLoginFormShowsFieldValidation() {
        LoginPage loginPage = new LoginPage(driver).open();
        loginPage.submitEmptyForm();

        assertThat(loginPage.emailError()).isEqualTo("Please enter your email");
        assertThat(loginPage.passwordError()).isEqualTo("Please enter your password");
    }

    @Test
    void invalidCredentialsKeepUserOnLoginPage() {
        LoginPage loginPage = new LoginPage(driver).open();

        loginPage.loginAs("wrong@example.com", "WrongPassword123!");

        assertThat(driver.getCurrentUrl()).endsWith("/login");
        assertThat(driver.findElement(By.id("email")).isDisplayed()).isTrue();
        assertThat(loginPage.apiError()).isEqualTo("Failed to log in. Please check your email and password.");
    }

    @Test
    void registrationShowsPasswordMismatchValidation() {
        RegistrationPage registrationPage = new LoginPage(driver)
                .open()
                .openRegistration();

        registrationPage.register("SeleniumUser", "selenium@example.com", "Password123!", "Different123!");

        assertThat(driver.getPageSource()).contains("Passwords do not match");
    }
}
