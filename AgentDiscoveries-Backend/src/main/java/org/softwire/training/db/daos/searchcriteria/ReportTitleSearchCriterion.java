package org.softwire.training.db.daos.searchcriteria;

import java.util.Collections;
import java.util.Map;

public class ReportTitleSearchCriterion extends ReportSearchCriterion {

    private static final String REPORT_TITLE_BINDING_NAME = "report_title_report";
    private final String reportTitle;

    public ReportTitleSearchCriterion(String reportTitle) {
        this.reportTitle = reportTitle;
    }

    @Override
    public String getSqlForWhereClause() { return "report_title LIKE CONCAT('%', :" + REPORT_TITLE_BINDING_NAME + ",'%')"; }

    @Override
    public Map<String, Object> getBindingsForSql() {
        return Collections.singletonMap(REPORT_TITLE_BINDING_NAME, reportTitle);
    }
}
