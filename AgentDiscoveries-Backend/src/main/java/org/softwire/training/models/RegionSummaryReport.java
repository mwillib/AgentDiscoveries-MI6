package org.softwire.training.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "region_summary_reports")
public class RegionSummaryReport extends ReportBase {

    private int regionId;
    private String reportTitle;

    @Column(name = "region_id", nullable = false)
    public int getRegionId() {
        return regionId;
    }

    public void setRegionId(int regionId) {
        this.regionId = regionId;
    }

    @Column(name = "report_title", length = 100, nullable = false)
    public String getReportTitle() {
        return reportTitle;
    }

    public void setReportTitle(String reportTitle) {this.reportTitle = reportTitle;
    }
}
