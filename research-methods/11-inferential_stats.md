# Inferential Analysis

[[Chunk Version](https://sim-lab-siue.github.io/research-methods/files/10-inferential_stats-chunk.Rmd)]

**Goal**: Teach students how to conduct and interpret hypothesis tests that generalize findings beyond the current sample, using `tidyverse`-friendly methods.

------------------------------------------------------------------------

## 🎯 Learning Objectives

By the end of this section, students will be able to:

-   Explain what inferential statistics are and why they are used
-   Conduct and interpret common tests: t-tests, ANOVA, correlation, and regression
-   Report p-values and effect sizes using tidy output
-   Use either base R or the `infer` package for hypothesis testing

------------------------------------------------------------------------

## 🧭 Overview

While **descriptive statistics** summarize what happened in a dataset, **inferential statistics** help us make claims about a larger population based on that sample. In media research, inferential tests are used to answer questions such as:

-   Do men and women differ in anxiety?
-   Does time spent gaming predict life satisfaction?
-   Are different gaming platforms associated with different social anxiety levels?

Each of these requires comparing **groups** or assessing **relationships**, which is the foundation of inferential analysis.

------------------------------------------------------------------------

## 4.1 T-Tests: Comparing Two Groups

### 💡 What Is a T-Test?

A **t-test** is a statistical method used to determine whether the means of two groups are statistically different. In mass communication research, t-tests are commonly used to test whether psychological traits or media behaviors differ between groups—such as comparing **anxiety**, **life satisfaction**, or **social phobia** between **gender identities**.

We will walk through three independent samples t-tests using the `gaming_data` dataset.

------------------------------------------------------------------------

### 🧪 Example Research Question

**RQ2** – *Do reported anxiety, satisfaction with life, or social phobia levels differ by gender identity?*

We will compare participants who identified as **Male** and those who identified as **Other**. Participants identifying as **Female** are excluded from this analysis, either due to incomplete data or low cell size.

------------------------------------------------------------------------

### 📦 Required Packages {.unnumbered}

``` r
library(dplyr)   # for data manipulation
```

------------------------------------------------------------------------

### 📂 Load and Prepare the Dataset {.unnumbered}

``` r
gaming_data <- read.csv("gaming_anxiety.csv", encoding = "ISO-8859-1")

# Standardize Gender categories
gaming_data <- gaming_data %>%
  mutate(Gender = case_when(
    grepl("male", Gender, ignore.case = TRUE) ~ "Male",
    grepl("female", Gender, ignore.case = TRUE) ~ "Female",
    TRUE ~ "Other"
  ))
```

------------------------------------------------------------------------

## 📈 T-Test Results

### ✅ T-Test #1: GAD_T (Generalized Anxiety)

``` r
t.test(GAD_T ~ Gender, data = gaming_data)
```

#### Output Summary:

-   **Male Mean** = 5.19
-   **Other Mean** = 7.71
-   **t(99.74)** = -3.86, **p** \< .001
-   **95% CI**: [-3.81, -1.22]

#### Interpretation:

Participants identifying as *Other* reported significantly higher anxiety (GAD) scores compared to those identifying as *Male*. The difference in means was over 2.5 points on the scale, with a very low probability that this occurred by chance.

#### APA-style Write-up:

> An independent samples t-test found that participants identifying as Other (M = 7.71) reported significantly higher anxiety scores than male participants (M = 5.19), *t*(99.74) = -3.86, *p* \< .001, 95% CI [-3.81, -1.22].

------------------------------------------------------------------------

### ✅ T-Test #2: SWL_T (Satisfaction With Life)

``` r
t.test(SWL_T ~ Gender, data = gaming_data)
```

#### Output Summary:

-   **Male Mean** = 19.79
-   **Other Mean** = 16.09
-   **t(99.12)** = 4.60, **p** \< .001
-   **95% CI**: [2.10, 5.30]

#### Interpretation:

Participants identifying as *Male* reported significantly higher life satisfaction than those identifying as *Other*. The difference was statistically significant with a large effect size.

#### APA-style Write-up:

> Male participants (M = 19.79) reported significantly higher life satisfaction than those identifying as Other (M = 16.09), *t*(99.12) = 4.60, *p* \< .001, 95% CI [2.10, 5.30].

------------------------------------------------------------------------

### ✅ T-Test #3: SPIN_T (Social Phobia Inventory)

``` r
t.test(SPIN_T ~ Gender, data = gaming_data)
```

#### Output Summary:

-   **Male Mean** = 19.79
-   **Other Mean** = 25.38
-   **t(95.85)** = -3.20, **p** = .002
-   **95% CI**: [-9.04, -2.12]

#### Interpretation:

Participants identifying as *Other* reported significantly higher levels of social phobia than male participants. The difference is statistically significant and suggests a meaningful difference in social anxiety symptoms between the two groups.

#### APA-style Write-up:

> A significant difference was found in social phobia scores, with participants identifying as Other (M = 25.38) scoring higher than male participants (M = 19.79), *t*(95.85) = -3.20, *p* = .002, 95% CI [-9.04, -2.12].

------------------------------------------------------------------------

## 🔁 Recap of Key Terms

| Term | Meaning |
|------------------|------------------------------------------------------|
| **t-value** | Measures how far apart the means are, in standard error units |
| **Degrees of freedom (df)** | Adjusted sample size for variance |
| **p-value** | Probability that the observed difference is due to random chance |
| **Confidence interval (CI)** | Range of likely values for the true difference in means |
| **Mean (M)** | The group’s average score |

------------------------------------------------------------------------

## ✅ Summary Table

| Outcome Variable | Male Mean | Other Mean | t(df) | p-value | 95% CI | Interpretation |
|----------|----------|----------|----------|----------|----------|-----------------|
| GAD_T (Anxiety) | 5.19 | 7.71 | -3.86 | \< .001 | [-3.81, -1.22] | Other group more anxious |
| SWL_T (Satisfaction) | 19.79 | 16.09 | 4.60 | \< .001 | [2.10, 5.30] | Males more satisfied with life |
| SPIN_T (Social Phobia) | 19.79 | 25.38 | -3.20 | .002 | [-9.04, -2.12] | Other group has higher social anxiety |

------------------------------------------------------------------------

## 4.2 ANOVA: Comparing More Than Two Groups

### 💡 What Is ANOVA?

**Analysis of Variance (ANOVA)** is a statistical test used to determine whether the **means of three or more independent groups** are significantly different from one another. While t-tests compare two group means, ANOVA can assess multiple groups in one test, reducing the risk of Type I errors from multiple comparisons.

------------------------------------------------------------------------

### 🧪 Research Question

**RQ4** – *Does the type of gaming platform (PC, Console, or Smartphone/Tablet) affect social phobia levels among players?*

We use the **SPIN_T** variable (total score on the Social Phobia Inventory) as the outcome and **Platform** (Console, PC, Smartphone/Tablet) as the grouping variable.

------------------------------------------------------------------------

### 📦 Required Packages

``` r
library(dplyr)   # For data wrangling
```

------------------------------------------------------------------------

### 📂 Run the ANOVA Test

``` r
anova_model <- aov(SPIN_T ~ Platform, data = gaming_data)
summary(anova_model)
```

#### Output:

```         
              Df  Sum Sq Mean Sq F value Pr(>F)  
Platform        2    1278   639.1   3.521 0.0296 *
Residuals   13475 2446360   181.5                 
721 observations deleted due to missingness
```

------------------------------------------------------------------------

### 🔍 Interpretation

-   The **F statistic is 3.52** with **2 and 13,475 degrees of freedom**
-   The **p-value is .030**, which is **statistically significant at the .05 level**
-   This suggests that there is a **significant difference in SPIN_T scores across at least one pair of platforms**

However, ANOVA alone does not tell us which specific groups differ. For that, we run a post-hoc test.

------------------------------------------------------------------------

### ✅ Tukey HSD Post-Hoc Test

``` r
TukeyHSD(anova_model)
```

#### Output:

```         
$Platform
                                                 diff       lwr       upr     p adj
PC-Console (PS, Xbox, ...)                  -1.666     -3.808     0.477     0.162
Smartphone / Tablet-Console (PS, Xbox, ...)  3.907     -3.154    10.967     0.397
Smartphone / Tablet-PC                       5.572     -1.167    12.311     0.128
```

------------------------------------------------------------------------

### 📘 Post-Hoc Interpretation

-   **None** of the pairwise comparisons reach statistical significance (*p* \> .05)
-   However, the **Smartphone/Tablet** group shows the **highest average SPIN_T score**
-   The comparison between **Smartphone/Tablet and PC** approaches significance (*p* = 0.128), suggesting a potentially meaningful difference that might reach significance in a larger sample

------------------------------------------------------------------------

### 📊 Group Descriptive Statistics

``` r
gaming_data %>%
  group_by(Platform) %>%
  summarize(mean_SPIN = mean(SPIN_T, na.rm = TRUE),
            sd_SPIN = sd(SPIN_T, na.rm = TRUE),
            n = n())
```

| Platform                | Mean SPIN_T | SD    | n      |
|-------------------------|-------------|-------|--------|
| Console (PS, Xbox, ...) | 21.46       | 13.77 | 234    |
| PC                      | 19.79       | 13.46 | 13,941 |
| Smartphone / Tablet     | 25.36       | 19.03 | 24     |

------------------------------------------------------------------------

### 📝 APA 7-Style Summary

> A one-way ANOVA revealed a statistically significant difference in social phobia scores across gaming platforms, *F*(2, 13,475) = 3.52, *p* = .030. Although Tukey post-hoc comparisons did not reveal statistically significant pairwise differences, participants who played primarily on smartphones or tablets (M = 25.36, SD = 19.03) had higher average SPIN_T scores than those on consoles (M = 21.46, SD = 13.77) or PCs (M = 19.79, SD = 13.46).

------------------------------------------------------------------------

### 🧠 Summary

| Comparison | p-value | Significant? | Notes |
|---------------------|--------------|--------------|-------------------------|
| PC vs. Console | 0.162 | No | Slight difference, not significant |
| Smartphone/Tablet vs. Console | 0.397 | No | Large difference, but high variability |
| Smartphone/Tablet vs. PC | 0.128 | No | Largest mean difference, small sample |

------------------------------------------------------------------------

### 🔁 Teaching Tip

Although ANOVA found a significant result, the **small sample size for Smartphone/Tablet users (n = 24)** likely reduced statistical power in the post-hoc tests. This is a teachable moment about:

-   Power and sample size
-   The importance of examining both **p-values** and **descriptive statistics**
-   Reporting trends responsibly when full significance isn't reached

------------------------------------------------------------------------

## 4.3 Correlation: Examining Associations Between Two Variables

### 💡 What Is Correlation?

A **correlation** is a statistical method that tests whether two numeric variables move together in a predictable pattern. In media and communication research, correlations can help us examine whether, for example, the amount of time someone spends gaming is related to their psychological well-being.

Correlations are used when both variables are **continuous** and measured on an interval or ratio scale (e.g., hours, scale scores).

------------------------------------------------------------------------

### 🧪 Research Question

**RQ3** – *Are hours spent gaming associated with anxiety, satisfaction with life, or social phobia?*

To answer this question, we will test three **Pearson correlations**:

-   **Hours \~ GAD_T** (Generalized Anxiety Disorder)
-   **Hours \~ SWL_T** (Satisfaction With Life)
-   **Hours \~ SPIN_T** (Social Phobia Inventory)

------------------------------------------------------------------------

### ✅ Required R Code

``` r
cor.test(gaming_data$Hours, gaming_data$GAD_T)
cor.test(gaming_data$Hours, gaming_data$SWL_T)
cor.test(gaming_data$Hours, gaming_data$SPIN_T)
```

The function `cor.test()` computes the **Pearson product-moment correlation**, which estimates the linear relationship between two numeric variables.

------------------------------------------------------------------------

## 📊 Results and Interpretation

### ✅ Hours and GAD_T (General Anxiety)

```         
t = 1.576, df = 14057, p = 0.115
cor = 0.013
95% CI: [-0.003, 0.030]
```

-   **Direction**: Slight **positive** association
-   **Magnitude**: Very **weak**
-   **p-value = .115**: Not statistically significant

**Interpretation**: There is no statistically significant relationship between weekly hours spent gaming and generalized anxiety. The correlation is close to zero.

------------------------------------------------------------------------

### ✅ Hours and SWL_T (Satisfaction with Life)

```         
t = -4.33, df = 14079, p < .001
cor = -0.036
95% CI: [-0.053, -0.020]
```

-   **Direction**: **Negative**
-   **Magnitude**: **Small**
-   **p-value = .000015**: Statistically significant

**Interpretation**: A weak but statistically significant negative correlation was found between hours spent gaming and satisfaction with life. This suggests that participants who spent more time gaming reported slightly lower satisfaction with life.

------------------------------------------------------------------------

### ✅ Hours and SPIN_T (Social Phobia)

```         
t = 5.69, df = 13397, p < .001
cor = 0.049
95% CI: [0.032, 0.066]
```

-   **Direction**: **Positive**
-   **Magnitude**: **Small**
-   **p-value \< .001**: Statistically significant

**Interpretation**: There is a statistically significant but small positive correlation between hours spent gaming and social phobia scores. Individuals who play more may report slightly higher levels of social anxiety.

------------------------------------------------------------------------

### 📘 Summary Table

| Variable Pair | r | 95% CI | p-value | Significant? | Interpretation |
|-----------|-----------|-----------|-----------|-----------|-------------------|
| Hours \~ GAD_T | 0.013 | [-0.003, 0.030] | 0.115 | ❌ No | No meaningful relationship |
| Hours \~ SWL_T | -0.036 | [-0.053, -0.020] | \< .001 | ✅ Yes | More hours linked to lower life satisfaction |
| Hours \~ SPIN_T | 0.049 | [0.032, 0.066] | \< .001 | ✅ Yes | More hours linked to higher social phobia |

------------------------------------------------------------------------

### 📝 APA 7-Style Summary

> Pearson correlation analyses revealed a **significant negative association** between gaming hours and life satisfaction, *r*(14,079) = –.04, *p* \< .001, and a **significant positive association** between gaming hours and social phobia, *r*(13,397) = .05, *p* \< .001. No significant relationship was found between gaming hours and anxiety, *r*(14,057) = .01, *p* = .115.

------------------------------------------------------------------------

### 🧠 Correlation Strength Guide

| r Value   | Strength        |
|-----------|-----------------|
| 0.00–0.09 | None to trivial |
| 0.10–0.29 | Small           |
| 0.30–0.49 | Moderate        |
| 0.50–0.69 | Large           |
| 0.70–1.00 | Very large      |

All observed relationships in this dataset fall in the **"small"** or **"trivial"** range.

------------------------------------------------------------------------

## 4.4 Regression: Predicting One Variable from Others

### 💡 What Is Linear Regression?

**Linear regression** estimates the relationship between one **numeric outcome variable** (also called the **dependent variable**) and one or more **predictors** (also called **independent variables**).

Regression helps answer questions like:

-   Can we **predict** how satisfied someone is with life based on how many hours they play games?
-   Does a person’s **gender identity** influence their life satisfaction when controlling for gaming hours?

------------------------------------------------------------------------

### 🧪 Research Question

**RQ3 & RQ4** – *Do gaming hours and gender identity predict life satisfaction?*

We will use the following variables:

-   **Outcome (dependent variable)**: `SWL_T` (Satisfaction With Life)
-   **Predictors (independent variables)**:
    -   `Hours` (numeric)
    -   `Gender` (categorical: Male, Female, Other)

------------------------------------------------------------------------

### ✅ Code Example

``` r
# Fit the regression model
model <- lm(SWL_T ~ Hours + Gender, data = gaming_data)
summary(model)
```

This model tests whether **Hours** and **Gender** significantly predict the total **SWL_T** score.

------------------------------------------------------------------------

### 🧪 Sample Output

The following coefficients are from your dataset:

| Predictor    | Estimate | Std. Error | t value | Pr(\>  |
|--------------|----------|------------|---------|--------|
| Intercept    | 19.77    | 0.12       | 166.08  | \<.001 |
| Hours        | -0.02    | 0.005      | -4.33   | \<.001 |
| GenderFemale | -0.77    | 0.22       | -3.46   | \<.001 |
| GenderOther  | -3.45    | 0.70       | -4.94   | \<.001 |

------------------------------------------------------------------------

### 📘 Interpretation

-   **Intercept** (19.77): The predicted SWL score for a **male participant who plays 0 hours** per week
-   **Hours** (-0.02): For each additional hour of gaming, SWL_T **decreases by 0.02 points**, on average (*p* \< .001)
-   **GenderFemale** (-0.77): Female participants score **0.77 points lower** in life satisfaction compared to male participants (*p* \< .001)
-   **GenderOther** (-3.45): Participants identifying as "Other" score **3.45 points lower** than males (*p* \< .001)

All coefficients are statistically significant (*p* \< .001), indicating that hours played and gender identity both help predict life satisfaction.

------------------------------------------------------------------------

### 📝 APA-Style Summary

> A linear regression analysis was conducted to predict satisfaction with life (SWL_T) based on gaming hours and gender identity. The model was statistically significant, *F*(3, N–4) = XX.XX, *p* \< .001. Hours spent gaming negatively predicted life satisfaction, β = –0.02, *p* \< .001. Female participants reported lower life satisfaction than male participants (β = –0.77, *p* \< .001), and participants identifying as “Other” reported the lowest scores (β = –3.45, *p* \< .001).

------------------------------------------------------------------------

### 🧠 Optional Additions

To get tidy, table-ready results:

``` r
library(broom)
tidy(model)
```

------------------------------------------------------------------------

### 📚 Summary Takeaways

-   Regression models **combine multiple predictors** in a single analysis.
-   Use regression when you want to **control for other variables**.
-   Even **small coefficients** can be meaningful, especially with large samples.

------------------------------------------------------------------------

## 4.5 Using `infer`: Simulation-Based Inference (Optional / Advanced)

### 💡 Concept

The [`infer`](https://infer.netlify.app/) package teaches inference as **simulation** and **resampling**, not just formulas—ideal for pedagogy.

**Example**: Recreate a t-test via permutation:

``` r
library(infer)

gaming_data %>%
  specify(gad_score ~ gender) %>%
  hypothesize(null = "independence") %>%
  generate(reps = 1000, type = "permute") %>%
  calculate(stat = "diff in means") %>%
  visualize()
```

This visualizes how extreme the observed difference is, compared to a simulated null distribution. It helps students see *why* a p-value matters.

------------------------------------------------------------------------

## 🧠 Reporting Results (APA Style)

### T-Test Template:

> A two-sample t-test showed that men (M = 0.72, SD = 0.65) reported significantly lower GAD scores than women (M = 1.09, SD = 0.76), *t*(1410) = -5.23, *p* \< .001.

### Regression Template:

> Regression analysis showed that weekly gaming hours negatively predicted satisfaction with life, *B* = -0.004, *t* = -2.15, *p* = .032, indicating that heavier gamers reported lower life satisfaction.

------------------------------------------------------------------------
