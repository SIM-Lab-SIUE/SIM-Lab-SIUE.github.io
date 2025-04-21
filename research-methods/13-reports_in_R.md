# Reporting Results Using R

## Overview

Once you have cleaned your data, performed descriptive analysis, tested your hypotheses, and visualized your results, the final step is to **report your findings**. Clear communication is essential in social science research. Regardless of whether your final product is a journal article, white paper, research brief, or class assignment, your goal is to:

-   Accurately report what you found
-   Summarize how you found it
-   Interpret the results with clarity and context

In this chapter, you will learn how to:

-   Create professional summary tables
-   Report statistical tests (t-tests, ANOVAs, correlations, regressions)
-   Present APA-style figures and tables using tidyverse tools
-   Write narrative summaries of findings
-   Combine text, tables, and plots in R Markdown or Quarto for a reproducible report

## Creating Summary Tables

### Purpose {.unnumbered}

Tables provide a compact and precise way to present results. In social science, tables are often used to:

-   Summarize group means and standard deviations
-   Report regression coefficients
-   Display p-values and confidence intervals

We will use three packages:

-   `gtsummary`: For professional summary tables with group comparisons
-   `kableExtra`: For styled tables in R Markdown documents
-   `flextable`: For exporting to Microsoft Word or PowerPoint

### Descriptive Summary by Group {.unnumbered}

``` r
library(gtsummary)

# Summarize psychological scores by gender
gaming_data %>%
  select(Gender, GAD_T, SWL_T, SPIN_T) %>%
  tbl_summary(by = Gender, missing = "no") %>%
  add_p() %>%
  bold_labels()
```

This produces:

-   Group means and standard deviations
-   Sample sizes
-   p-values from t-tests or ANOVA

To convert to a Word document:

``` r
as_flex_table() %>%
  flextable::save_as_docx(path = "tables/summary_table.docx")
```

### Regression Table {.unnumbered}

``` r
library(broom)

# Fit model
model <- lm(SWL_T ~ Hours + Gender, data = gaming_data)

# Create regression summary
tidy(model, conf.int = TRUE)
```

This output includes:

-   Coefficient estimates
-   Standard errors
-   Confidence intervals
-   p-values

You can turn this into a table for publication:

``` r
library(kableExtra)

tidy(model, conf.int = TRUE) %>%
  kable(digits = 3, caption = "Linear Regression Predicting SWL_T") %>%
  kable_styling(full_width = FALSE)
```

## Writing Narrative Results

### APA 7-Style Guidelines {.unnumbered}

In APA format, results are reported in **narrative form** along with **supporting tables or figures**. Here are templates for each type of analysis.

### T-Test Narrative

> A Welch’s t-test indicated that other-identifying participants (M = 7.71, SD = 1.2) reported significantly higher anxiety than male participants (M = 5.19, SD = 1.3), *t*(99.74) = -3.86, *p* \< .001, 95% CI [-3.81, -1.22].

### ANOVA Narrative

> A one-way ANOVA revealed a significant effect of gaming platform on SPIN_T scores, *F*(2, 13475) = 3.52, *p* = .030. Tukey post-hoc comparisons did not identify significant pairwise differences, but mobile gamers (M = 25.36) reported higher scores than PC gamers (M = 19.79).

### Correlation Narrative

> There was a small but statistically significant negative correlation between hours played and life satisfaction, *r*(14,079) = –.04, *p* \< .001, indicating that more frequent gaming was associated with slightly lower life satisfaction.

### Regression Narrative

> A linear regression model showed that both gaming hours (*b* = –0.003, *p* \< .001) and identifying as "Other" (*b* = –3.39, *p* \< .001) significantly predicted SWL_T. The overall model was significant, *F*(2, 14078) = 19.24, *p* \< .001, *R²* = .003.

## Presenting Visuals

When including figures:

-   Always number and caption them (e.g., “Figure 1”)
-   Refer to them in your text (e.g., “as shown in Figure 1”)
-   Avoid redundant text—use the narrative to interpret, not repeat, the figure

Example R code to save a plot:

``` r
plot <- ggplot(gaming_data, aes(x = Hours, y = SWL_T)) +
  geom_point(alpha = 0.3) +
  geom_smooth(method = "lm", color = "blue") +
  labs(
    title = "Gaming Hours and Life Satisfaction",
    x = "Hours Played per Week",
    y = "SWL_T Score"
  ) +
  theme_minimal()

ggsave("figures/swl_vs_hours.png", plot = plot, width = 6, height = 4, dpi = 300)
```

## Building a Full Report in R Markdown or Quarto

R Markdown and Quarto allow you to integrate:

-   Your code
-   Output (plots, tables)
-   Narrative text

This ensures full **reproducibility** and consistent formatting for publication or submission.

### Sample Structure for a White Paper or Manuscript {.unnumbered}

``` markdown
# Introduction
Describe your research question and context.

# Methods
Explain how the data were collected and analyzed.

# Results
Present tables, plots, and narratives using APA formatting.

# Discussion
Interpret the findings and connect them to prior research.

# Appendix
Include full tables or model outputs if needed.
```

You can export to PDF, Word, or HTML using the **Knit** button in RStudio or the **Render** button in Quarto.

## Summary

In this chapter, you learned to:

-   Summarize variables and test results in professional tables
-   Report findings clearly using APA 7-style narratives
-   Combine text, tables, and plots into cohesive reports
-   Export visuals and tables for use in external documents
-   Create reproducible reports for scientific and professional communication

By the end of this process, you should be prepared to produce a polished, complete, and publication-ready document—whether that is a research manuscript, white paper, policy brief, or data report.
