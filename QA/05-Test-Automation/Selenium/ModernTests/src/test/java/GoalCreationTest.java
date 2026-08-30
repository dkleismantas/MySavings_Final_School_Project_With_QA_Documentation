import config.TestConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import pages.DashboardPage;
import pages.LoginPage;

import static org.assertj.core.api.Assertions.assertThat;

class GoalCreationTest extends BaseUiTest {
    private DashboardPage dashboard;

    @BeforeEach
    void logIn() {
        dashboard = new LoginPage(driver)
                .open()
                .loginAs(TestConfig.testEmail(), TestConfig.testPassword());
    }

    @Test
    void createGoalModalOpensWithRequiredFields() {
        dashboard.openNewGoalModal();

        assertThat(driver.getPageSource()).contains("Create New Goal");
        assertThat(driver.getPageSource()).contains("Goal title");
        assertThat(driver.getPageSource()).contains("Target amount (€)");
        assertThat(driver.getPageSource()).contains("Target date");
    }
}
