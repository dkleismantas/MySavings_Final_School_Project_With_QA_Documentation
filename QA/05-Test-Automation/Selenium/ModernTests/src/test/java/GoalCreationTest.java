import config.TestConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import pages.CreateGoalModal;
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
        CreateGoalModal modal = dashboard.openNewGoalModal();

        assertThat(modal.isLoaded()).isTrue();
        assertThat(modal.hasGoalTitleField()).isTrue();
        assertThat(modal.hasTargetAmountField()).isTrue();
        assertThat(modal.hasTargetDateField()).isTrue();
    }
}
