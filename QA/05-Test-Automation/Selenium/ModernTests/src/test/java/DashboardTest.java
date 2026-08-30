import config.TestConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import pages.DashboardPage;
import pages.LoginPage;

import static org.assertj.core.api.Assertions.assertThat;

class DashboardTest extends BaseUiTest {
    private DashboardPage dashboard;

    @BeforeEach
    void logIn() {
        dashboard = new LoginPage(driver)
                .open()
                .loginAs(TestConfig.testEmail(), TestConfig.testPassword());
    }

    @Test
    void dashboardAllowsGoalSortSelection() {
        for (String value : new String[] {"newest", "deadline", "amount", "progress"}) {
            dashboard.sortBy(value);
            assertThat(dashboard.selectedSort()).isEqualTo(value);
        }
    }

    @Test
    void dashboardAllowsNameFilter() {
        dashboard.openFilters();
        dashboard.searchGoals("Goal");
        dashboard.applyFilters();

        assertThat(dashboard.isLoaded()).isTrue();
    }
}
