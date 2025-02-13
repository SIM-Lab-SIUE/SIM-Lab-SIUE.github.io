# Inferential Analysis

[[Chunk Version]](files/10-inferential_stats-chunk.Rmd)

## Introduction

In mass communication research, inferential statistics enable researchers to draw conclusions about larger populations based on data collected from smaller samples. Unlike descriptive statistics, which summarize data points, inferential statistics focus on making inferences or predictions that extend beyond immediate observations. These statistical tools allow researchers to test hypotheses, assess relationships among variables, and predict behaviors within audiences, media, and broader communication phenomena.

This chapter introduces several key inferential analyses commonly used in media studies, including the Chi-Square Test of Independence, T-tests, Analysis of Variance (ANOVA), and Regression Analysis. Each analysis type serves specific research purposes, ranging from comparing categorical data to exploring relationships and predicting outcomes. Together, these techniques equip researchers with the tools needed to address a wide range of research questions in communication studies, helping to reveal underlying patterns and connections in media interactions and audience behavior.

### Loading Necessary R Packages {.unnumbered}

The following packages are required to execute the analyses presented in this chapter. Each package plays a unique role in data manipulation, visualization, or statistical testing, which will be clarified in the sections that follow.

```r
# Install and load necessary packages
if (!require("data.table")) install.packages("data.table")
if (!require("dplyr")) install.packages("dplyr")
if (!require("psych")) install.packages("psych")
if (!require("DescTools")) install.packages("DescTools")
if (!require("effectsize")) install.packages("effectsize")
if (!require("emmeans")) install.packages("emmeans")
```

-   **data.table**: Efficiently handles large datasets, particularly useful when working with substantial media-related data files.
-   **dplyr**: Facilitates data manipulation and cleaning, ensuring datasets are structured appropriately for each analysis type.
-   **psych**: Provides functions for descriptive statistics and inferential tests essential in social science research.
-   **DescTools**: Extends base R functionality, offering additional tools for hypothesis testing and statistical analysis.

### Loading the Datasets {.unnumbered}

The analyses in this chapter utilize four distinct datasets from various domains in media studies, loaded from external sources to ensure reproducibility. The datasets include `anime`, `horror_movies`, `survivor`, and `video_games`, each of which has a corresponding data dictionary to help interpret variables and structure. Below, we load these datasets and briefly describe their contents.

```r
# Load datasets
anime <- fread("https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2019/2019-04-23/tidy_anime.csv")
horror_movies <- fread("https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2022/2022-11-01/horror_movies.csv")
survivor <- fread("https://raw.githubusercontent.com/rfordatascience/tidytuesday/refs/heads/master/data/2021/2021-06-01/summary.csv")
video_games <- fread("https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2019/2019-07-30/video_games.csv")
```

### Drop Scientific Notation {.unnumbered}

The following option allows you to stop scientific notation.

```r
options(scipen = 999) 
```

**Dataset Overviews**:
-   **Anime (`tidy_anime.csv`)**: Contains information on anime titles, genres, ratings, and related features. This dataset provides insights into audience preferences and trends within anime viewership.
-   **Horror Movies (`horror_movies.csv`)**: Focuses on horror film attributes, including genre, average rating, and viewer demographics, useful for examining genre-specific patterns.
-   **Survivor (`summary.csv`)**: Summarizes data from the reality TV show *Survivor*, with details on seasons, contestants, and competition outcomes. This dataset aids in studying audience interest and media representation in reality TV.
-   **Video Games (`video_games.csv`)**: Offers data on video game titles, genres, release dates, and player ratings. This dataset supports research on gaming trends, player behavior, and genre appeal.


These datasets provide a diverse foundation for practicing various inferential analyses throughout this chapter. Researchers can consult the respective data dictionaries to understand variable meanings and data structures, as these resources will aid in interpreting results from the analyses to follow.

## Chi-Square Test of Independence

The Chi-Square Test of Independence assesses whether a statistically significant association exists between two categorical variables. This non-parametric test does not assume a normal distribution, making it ideal for categorical data. The chi-square test reveals whether certain groups show distinct preferences or behaviors.

*Analysis Overview*

The Chi-Square Test of Independence examines the association between categorical variables by comparing observed frequencies with expected frequencies if the variables were independent. In this example, we analyze whether two major genre combinations—**Horror, Thriller** and **Comedy, Horror**—are associated with different levels of average movie ratings.

*Type of Data*

The test requires two categorical variables, each with at least two levels. Here, we use: - **`genre_names`**: Representing two combinations of genres in the horror movie dataset. - **`vote_average_category`**: A categorical version of movie ratings, binned into "Low," "Medium," and "High."

*R Code for Analysis*

In this example, we filter the `horror_movies` dataset to focus on movies that fall under either **Horror, Thriller** or **Comedy, Horror** genres. We then categorize the movie ratings into low, medium, and high categories before calculating the crosstab table and performing the chi-square test. After the chi-square test, we use `cramers_v` from the `effectsize` package to calculate the effect size.

```r
# Filter for desired genres and create a binned category for vote_average
thriller_comedy <- horror_movies %>%
  filter(genre_names %in% c("Horror, Thriller", "Comedy, Horror")) %>%
  mutate(vote_average_category = cut(vote_average, 
                                     breaks = c(0, 4, 7, 10),
                                     labels = c("Low", "Medium", "High")))

# Crosstab of genre and vote average category
table_genre_ratings <- table(thriller_comedy$genre_names, thriller_comedy$vote_average_category)
print(table_genre_ratings)

# Perform chi-square test
chi_square_result <- chisq.test(table_genre_ratings)
print(chi_square_result)

# Calculate effect size (Cramér's V)
effect_size_chi_square <- cramers_v(chi_square_result)
print(effect_size_chi_square)
```

*Analysis Output*

The output of the chi-square test provides the following information:

```         
    Pearson's Chi-squared test

data:  table_genre_ratings
X-squared = 26.392, df = 2, p-value = 0.000001858

# Crosstab Output
                    Low Medium High
  Comedy, Horror    448   1059  202
  Horror, Thriller  575   1668  190

# Effect Size Output (Cramér's V)
Cramer's V (adj.) |       95% CI
--------------------------------
0.08              | [0.05, 1.00]
```

*Output Explanation*

-   **X-squared**: This test statistic reflects the degree of association between genre and rating category. A higher X-squared value suggests a greater difference between observed and expected counts. 
-   **df**: Degrees of freedom, calculated as $(\text{rows} - 1) \times (\text{columns} - 1)$, which in this case equals 2. 
-   **p-value**: A significant p-value (e.g., $p = 1.858 \times 10^{-6}$) indicates a statistically significant association between genre and rating category. 
-   **Cramér's** $V$: The effect size measure for chi-square tests of independence. In this example, a Cramér’s $V$ of 0.05 suggests a small effect size, indicating that while the association is statistically significant, the relationship between genre and rating categories is weak.

**Additional Interpretation**: A significant p-value indicates that genre and rating categories are associated, suggesting that certain genres tend to have specific rating distributions. However, a small Cramér’s $V$ effect size (0.05) suggests that this association, while statistically significant, is not practically strong. Researchers might explore additional variables or contexts for more robust associations.

## T-tests

T-tests are statistical methods used to compare the means of one or more groups. In mass communication research, t-tests can help evaluate differences in viewer engagement, ratings, or preferences between distinct groups or conditions. T-tests rely on assumptions such as normally distributed data and homogeneity of variances, making them ideal for continuous data.

### Single Sample T-test {.unnumbered}

*Analysis Overview*

The single sample t-test compares the mean of a single group to a known value or population mean. This test is suitable when researchers want to determine if the average score of a sample differs significantly from a theoretical or historical benchmark.

**Example**: Comparing the mean rating of horror movies to the average IMDb rating of 6.2 to see if horror movies are rated differently on average.

*Type of Data*

-   Continuous data for the sample mean.
-   A known comparison mean (population mean).

*R Code for Analysis*

In this example, we use the `horror_movies` dataset to test whether the mean rating deviates from the IMDb average rating of 6.2. We then calculate Cohen’s $d$ effect size using the `effectsize` package to quantify the size of this difference.

```r
# Perform single sample t-test
t_test_single <- t.test(horror_movies$vote_average, mu = 6.2)

# Display test results
print(t_test_single)

# Calculate effect size (Cohen's d)
effect_size_single <- t_to_d(t_test_single$statistic, df = t_test_single$parameter)
print(effect_size_single)
```

*Analysis Output*

The output for the single sample t-test includes the t-statistic, degrees of freedom, p-value, and confidence interval. Example output:

```         
    One Sample t-test

data:  horror_movies$vote_average
t = -179.65, df = 32539, p-value < 0.00000000000000022
alternative hypothesis: true mean is not equal to 6.2
95 percent confidence interval:
 3.304479 3.366978
sample estimates:
mean of x 
 3.335728 

d     |         95% CI
----------------------
-1.99 | [-2.02, -1.97]
```

*Output Explanation*

-   **t**: The t-statistic indicates the strength and direction of the difference.
-   **df**: Degrees of freedom, which equals the sample size minus one.
-   **p-value**: A p-value below the threshold (e.g., 0.05) suggests that the sample mean significantly differs from 6.2.
-   **Confidence Interval**: Provides a range within which the true mean difference is likely to fall.
-   **Cohen’s** $d$: An effect size of -1.98 indicates a large effect, meaning that the difference between the horror movie ratings and the IMDb average is not only statistically significant but also substantial.

### Independent Samples T-test {.unnumbered}

*Analysis Overview*

The independent samples t-test compares the means of two separate groups. This test is appropriate for analyzing differences between independent groups, such as comparing viewer ratings between anime based on manga and original anime.

*Type of Data*

-   Continuous data for each group.
-   Two independent groups.

*R Code for Analysis*

In this example, we use the `anime` dataset to test whether ratings differ between anime based on manga and original anime. After performing the t-test, we use the `t_to_d` function to calculate Cohen’s $d$ effect size for the difference.

```r
# Filter for two source types
original_manga <- anime %>%
  filter(source %in% c("Manga", "Original"))

# Perform independent samples t-test
t_test_independent <- t.test(original_manga$score ~ original_manga$source)

# Display test results
print(t_test_independent)

# Calculate effect size (Cohen's d) for independent samples t-test
effect_size_independent <- t_to_d(t_test_independent$statistic, df = t_test_independent$parameter)
print(effect_size_independent)
```

*Analysis Output*

The output for the independent samples t-test includes the t-statistic, degrees of freedom, p-value, and confidence interval. Example output:

```         
    Welch Two Sample t-test

data:  original_manga$score by original_manga$source
t = 65.474, df = 28574, p-value < 0.00000000000000022
alternative hypothesis: true difference in means between group Manga and group Original is not equal to 0
95 percent confidence interval:
 0.6240156 0.6625298
sample estimates:
   mean in group Manga mean in group Original 
              7.317174               6.673901 

d    |       95% CI
-------------------
0.77 | [0.75, 0.80]
```

*Output Explanation*

-   **t**: Indicates the direction of the difference.
-   **p-value**: A significant p-value suggests a meaningful difference in ratings between manga-based and original anime.
-   **Confidence Interval**: Indicates the range of the mean difference.
-   **Cohen’s** $d$: An effect size of 0.82 indicates a large effect, suggesting that manga-based and original anime differ substantially in average ratings.

### Paired Samples T-test {.unnumbered}

*Analysis Overview*

The paired samples t-test compares two related measurements, such as pre- and post-test scores for the same group. This test is useful for evaluating changes within a single sample over time or across conditions.  

**Example**: Comparing viewers for the premier and finale episodes of a season in the `survivor` dataset to assess shifts in viewer interest.

*Type of Data*

-   Continuous data from the same subjects or matched pairs in two     conditions.

*R Code for Analysis*

In this example, we test for significant differences between premier and finale viewership, then calculate Cohen’s $d$ for paired samples to quantify the effect size.

```r
# Perform paired samples t-test
paired_t_test_result <- t.test(survivor$viewers_premier, survivor$viewers_finale, paired = TRUE)

# Display test results
print(paired_t_test_result)

# Calculate effect size (Cohen's d) for paired samples t-test
effect_size_paired <- t_to_d(paired_t_test_result$statistic, df = paired_t_test_result$parameter, paired = TRUE)
print(effect_size_paired)
```

*Analysis Output*

The output for the paired samples t-test includes the t-statistic, degrees of freedom, p-value, and confidence interval for the mean difference.

```         
    Paired t-test

data:  survivor$viewers_premier and survivor$viewers_finale
t = -0.76096, df = 39, p-value = 0.4513
alternative hypothesis: true mean difference is not equal to 0
95 percent confidence interval:
 -2.764596  1.253096
sample estimates:
mean difference 
       -0.75575 

d     |        95% CI
---------------------
-0.12 | [-0.44, 0.19]
```

*Output Explanation*

-   **t**: Reflects the difference in means between paired scores.
-   **p-value**: A significant p-value would indicate a significant difference between premier and finale viewership.
-   **Confidence Interval**: Indicates the range of the mean difference between conditions.
-   **Cohen’s** $d$: An effect size of -0.12 suggests a small effect, indicating that the difference between premier and finale viewership is minimal and not practically significant.

## Analysis of Variance (ANOVA)

ANOVA (Analysis of Variance) tests whether significant differences exist among the means of three or more groups. Unlike t-tests, which compare only two groups, ANOVA enables researchers to examine multiple groups simultaneously, making it ideal for comparing variables across different demographic or experimental conditions in mass communication research.

### One-Way ANOVA {.unnumbered}

*Analysis Overview*

One-way ANOVA assesses differences in a continuous dependent variable across multiple levels of a single categorical independent variable. This test is useful when examining the effect of one factor on an outcome, such as differences in viewer ratings across various genres or publishers.

**Example**: Using the `video_games` dataset, we test whether metascores vary significantly across top publishers.

*Type of Data*

-   **Dependent Variable**: Continuous data (e.g., metascores).
-   **Independent Variable**: Categorical with three or more levels (e.g., publishers).

*R Code for Analysis*

In this example, one-way ANOVA tests whether average metascores differ across the top three publishers in the `video_games` dataset. After performing the ANOVA, we calculate effect size using `eta_squared` from the `effectsize` package. Since the ANOVA is significant, we also run a post hoc Tukey HSD test using the `emmeans` package to identify specific differences between publishers.

```r
# Filter for top publishers
top_game_publishers <- video_games %>%
  filter(publisher %in% c("SEGA", "Ubisoft", "Square Enix"))

# Perform one-way ANOVA
one_way_aov_results <- aov(metascore ~ publisher, data = top_game_publishers)

# Display ANOVA summary
print(summary(one_way_aov_results))

# Calculate effect size (Eta-squared)
effect_size_one_way <- eta_squared(one_way_aov_results)
print(effect_size_one_way)

# Post Hoc Test - Tukey HSD
posthoc_results <- emmeans(one_way_aov_results, pairwise ~ publisher)
print(posthoc_results)
```

*Analysis Output*

The output for one-way ANOVA includes the F-statistic, degrees of freedom, p-value, and effect size. Example output:

```         
             Df Sum Sq Mean Sq F value Pr(>F)
publisher     2    207  103.53   1.322  0.269
Residuals   171  13387   78.29               
185 observations deleted due to missingness

For one-way between subjects designs, partial eta squared is equivalent to
  eta squared. Returning eta squared.
  
# Effect Size for ANOVA

Parameter | Eta2 |       95% CI
-------------------------------
publisher | 0.02 | [0.00, 1.00]

- One-sided CIs: upper bound fixed at [1.00].$emmeans
 publisher   emmean    SE  df lower.CL upper.CL
 SEGA          76.2 1.350 171     73.5     78.8
 Square Enix   74.6 1.290 171     72.0     77.1
 Ubisoft       77.2 0.965 171     75.3     79.1

Confidence level used: 0.95 

$contrasts
 contrast              estimate   SE  df t.ratio p.value
 SEGA - Square Enix        1.57 1.87 171   0.839  0.6792
 SEGA - Ubisoft           -1.05 1.66 171  -0.634  0.8017
 Square Enix - Ubisoft    -2.62 1.61 171  -1.625  0.2380

P value adjustment: tukey method for comparing a family of 3 estimates 
```

*Output Explanation*

-   **F-statistic**: Represents the ratio of variance between groups to variance within groups. Higher F values indicate stronger group effects.
-   **p-value**: If the p-value is below the significance threshold (e.g., 0.05), we reject the null hypothesis, concluding that there are significant differences among publishers. In this example, however, the p-value (0.269) suggests that the differences in metascores between publishers are not statistically significant.
-   **Eta-squared**: The effect size measure for ANOVA, Eta-squared, shows the proportion of variance in metascores explained by the publisher. Here, an Eta-squared of 0.02 suggests a very small effect size, indicating that publisher has minimal influence on metascores.
-   **Tukey HSD Post Hoc**: Provides pairwise comparisons between each publisher’s metascores. None of the comparisons here are statistically significant, as indicated by the high p-values (e.g., $p = 0.6792$ for SEGA vs. Square Enix).

Overall, the non-significant p-value, small effect size, and lack of significant pairwise differences suggest that metascores do not vary significantly across these publishers, and publisher is likely not a strong predictor of metascore variability in this dataset.

### Two-Way ANOVA {.unnumbered}

*Analysis Overview*

Two-way ANOVA assesses the effect of two independent variables and their interaction on a continuous dependent variable. This test is suitable when researchers wish to understand not only the main effects of each factor but also whether there is an interaction effect between them.

**Example**: Examining the impact of genre (`genre_names`) and language (`original_language`) on horror movie ratings in the `thriller_comedy` data subset.

*Type of Data*

-   **Dependent Variable**: Continuous data (e.g., movie ratings).
-   **Independent Variables**: Two categorical variables, each with two or more levels.

*R Code for Analysis*

In this example, two-way ANOVA tests the effect of `genre_names` and `original_language` on `vote_average` for **Comedy, Horror** and **Horror, Thriller** films across the top three non-English languages. We calculate effect size (partial eta-squared) using the `effectsize` package and conduct post hoc comparisons with the `emmeans` package to examine specific group differences within the interaction.

```r
# Filter for top non-English languages for selected genres
thriller_comedy_languages <- thriller_comedy %>%
  filter(original_language %in% c("es", "ja", "de"))

# Perform two-way ANOVA
aov_results_two_way <- aov(vote_average ~ genre_names * original_language, data = thriller_comedy_languages)

# Display ANOVA summary
print(summary(aov_results_two_way))

# Calculate effect size (Partial Eta-squared)
effect_size_two_way <- eta_squared(aov_results_two_way, partial = TRUE)
print(effect_size_two_way)

# Post Hoc Test - Tukey HSD for interaction term
posthoc_results_two_way <- emmeans(aov_results_two_way, pairwise ~ genre_names * original_language)
print(posthoc_results_two_way)
```

*Analysis Output*

The output for two-way ANOVA includes the F-statistic and p-value for each main effect and interaction term, as well as the effect size.

```         
                               Df Sum Sq Mean Sq F value Pr(>F)  
genre_names                     1     48   48.23   6.053 0.0142 *
original_language               2      4    2.22   0.279 0.7567  
genre_names:original_language   2     16    7.76   0.974 0.3784  
Residuals                     488   3888    7.97                 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

# Effect Size for ANOVA (Type I)

Parameter                     | Eta2 (partial) |       95% CI
-------------------------------------------------------------
genre_names                   |           0.01 | [0.00, 1.00]
original_language             |       1.14e-03 | [0.00, 1.00]
genre_names:original_language |       3.98e-03 | [0.00, 1.00]

- One-sided CIs: upper bound fixed at [1.00].$emmeans
 genre_names      original_language emmean    SE  df lower.CL upper.CL
 Comedy, Horror   de                  2.95 0.342 488     2.27     3.62
 Horror, Thriller de                  4.15 0.416 488     3.33     4.97
 Comedy, Horror   es                  3.26 0.266 488     2.74     3.78
 Horror, Thriller es                  3.87 0.238 488     3.40     4.34
 Comedy, Horror   ja                  3.29 0.395 488     2.52     4.07
 Horror, Thriller ja                  3.46 0.326 488     2.82     4.10

Confidence level used: 0.95 

$contrasts
 contrast                                  estimate    SE  df t.ratio p.value
 Comedy, Horror de - Horror, Thriller de    -1.2051 0.539 488  -2.236  0.2230
 Comedy, Horror de - Comedy, Horror es      -0.3140 0.433 488  -0.725  0.9789
 Comedy, Horror de - Horror, Thriller es    -0.9210 0.417 488  -2.210  0.2349
 Comedy, Horror de - Comedy, Horror ja      -0.3451 0.523 488  -0.660  0.9861
 Comedy, Horror de - Horror, Thriller ja    -0.5156 0.473 488  -1.091  0.8850
 Horror, Thriller de - Comedy, Horror es     0.8911 0.494 488   1.805  0.4634
 Horror, Thriller de - Horror, Thriller es   0.2841 0.479 488   0.593  0.9915
 Horror, Thriller de - Comedy, Horror ja     0.8600 0.574 488   1.498  0.6655
 Horror, Thriller de - Horror, Thriller ja   0.6895 0.529 488   1.304  0.7826
 Comedy, Horror es - Horror, Thriller es    -0.6070 0.356 488  -1.703  0.5303
 Comedy, Horror es - Comedy, Horror ja      -0.0311 0.476 488  -0.065  1.0000
 Comedy, Horror es - Horror, Thriller ja    -0.2016 0.420 488  -0.480  0.9969
 Horror, Thriller es - Comedy, Horror ja     0.5759 0.461 488   1.249  0.8125
 Horror, Thriller es - Horror, Thriller ja   0.4054 0.403 488   1.005  0.9162
 Comedy, Horror ja - Horror, Thriller ja    -0.1705 0.512 488  -0.333  0.9995

P value adjustment: tukey method for comparing a family of 6 estimates 
```

*Output Explanation*

-   **Main Effects**: The F-statistics and p-values for `genre_names` and `original_language` show whether each has a statistically significant effect on `vote_average`. Here, `genre_names` is significant ($p = 0.0142$), indicating that genres differ in their ratings, whereas `original_language` does not have a significant effect ($p = 0.7567$).
-   **Interaction Effect**: The F-statistic and p-value for `genre_names:original_language` suggest that the interaction between genre and language is not statistically significant ($p = 0.3784$), meaning that the effect of genre on ratings does not vary substantially by language.
-   **Partial Eta-squared**: The effect sizes indicate that `genre_names` has a small effect (0.01), while `original_language` and the interaction term have very small effect sizes, suggesting that their influence on ratings is minimal.
-   **Tukey HSD Post Hoc**: Provides pairwise comparisons for each level within the interaction, identifying any significant differences between combinations of genres and languages. In this example, none of the pairwise comparisons are significant, indicating that while genres differ overall, no specific genre-language combinations differ significantly in terms of ratings.

The results suggest a significant effect of genre on ratings with a small effect size, but no significant effect of language or interaction between genre and language. This implies that genre has a modest influence on ratings, while language and genre-language interactions do not contribute meaningfully to rating differences.

### ANCOVA (Analysis of Covariance) {.unnumbered}

*Analysis Overview*

ANCOVA extends ANOVA by including one or more continuous covariates. This technique assesses group differences while controlling for potential confounding variables, making it useful for isolating the effect of categorical variables on a dependent variable.

**Example**: Using the `anime` dataset, we examine whether anime ratings differ by `source`, while controlling for `genre` as an additional factor.

*Type of Data*

-   **Dependent Variable**: Continuous data (e.g., anime scores).
-   **Independent Variable**: Categorical with two or more levels (e.g., source).
-   **Covariate**: Continuous or categorical variable to control for confounding effects (e.g., genre).

*R Code for Analysis*

In this example, ANCOVA tests if score differences by `source` persist when controlling for `genre`. We calculate partial eta-squared as the effect size using the `effectsize` package. Additionally, we perform a post hoc Tukey HSD test using the `emmeans` package to examine specific pairwise differences between sources.

```r
# Perform ANCOVA
ancova_results <- aov(score ~ source + genre, data = original_manga)

# Display ANCOVA summary
print(summary(ancova_results))

# Calculate effect size (Partial Eta-squared)
effect_size_ancova <- eta_squared(ancova_results, partial = TRUE)
print(effect_size_ancova)

# Post Hoc Test - Tukey HSD for source
posthoc_results_ancova <- emmeans(ancova_results, pairwise ~ source)
print(posthoc_results_ancova)
```

*Analysis Output*

The ANCOVA output includes the F-statistic and p-values for the main effects of `source` and `genre`, indicating if group differences persist after accounting for the covariate.

Example output:

```         
               Df Sum Sq Mean Sq F value              Pr(>F)    
source          1   4338    4338  5526.7 <0.0000000000000002 ***
genre          40   4189     105   133.4 <0.0000000000000002 ***
Residuals   43588  34213       1                                
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1
90 observations deleted due to missingness
# Effect Size for ANOVA (Type I)

Parameter | Eta2 (partial) |       95% CI
-----------------------------------------
source    |           0.11 | [0.11, 1.00]
genre     |           0.11 | [0.10, 1.00]

- One-sided CIs: upper bound fixed at [1.00].$emmeans
 source   emmean      SE    df lower.CL upper.CL
 Manga     7.195 0.00875 43588    7.178    7.212
 Original  6.656 0.00963 43588    6.637    6.675

Results are averaged over the levels of: genre 
Confidence level used: 0.95 

$contrasts
 contrast         estimate      SE    df t.ratio p.value
 Manga - Original    0.539 0.00944 43588  57.099  <.0001

Results are averaged over the levels of: genre 
```

*Output Explanation*

-   **Main Effect (source)**: A significant main effect for `source` ($p < 2e-16$) suggests that ratings differ across anime sources, even after accounting for the covariate `genre`.
-   **Covariate (genre)**: The significant effect of `genre` ($p < 2e-16$) indicates that genre also impacts ratings, contributing to the variance in `score`.
-   **Partial Eta-squared**: The partial eta-squared values for `source` and `genre` are both 0.11, suggesting a moderate effect size, indicating that both source type and genre explain a meaningful portion of the variance in anime ratings.
-   **Tukey HSD Post Hoc**: The pairwise comparison between `Manga` and `Original` (estimated difference of 0.539, $p < .0001$) shows a significant difference, with `Manga` scoring higher on average than `Original`, averaged over all genres.

These results imply that both `source` type and genre are significant predictors of anime ratings. The moderate effect sizes indicate that `source` and `genre` each contribute meaningfully to explaining the variation in ratings, with `Manga` showing higher ratings than `Original` even after accounting for genre differences.

## Regression Analysis

Regression analysis examines relationships between a dependent variable and one or more independent variables, enabling researchers to model and predict outcomes. In mass communication research, regression analysis can help identify factors that influence viewer ratings, engagement, or other media-related outcomes. This section covers simple linear regression, multiple linear regression, and logistic regression, each suited to different research contexts and types of data.

### Simple Linear Regression {.unnumbered}

*Analysis Overview*

Simple linear regression models the relationship between a single independent variable and a dependent variable. This model assumes a linear relationship, with changes in the independent variable predicting proportional changes in the dependent variable.

**Example**: Using the `video_games` dataset, we examine the relationship between `price` and `metascore`, hypothesizing that games with higher prices may have different review scores.

*Type of Data*

-   **Dependent Variable**: Continuous data (e.g., `metascore`).
-   **Independent Variable**: Continuous data (e.g., `price`).

*R Code for Analysis*

This example performs simple linear regression to predict `metascore` based on `price` in the `video_games` dataset.

```r
# Perform simple linear regression
lm_simple <- lm(metascore ~ price, data = video_games)

# Display regression summary
summary(lm_simple)
```

*Analysis Output*

The output includes the coefficients, R-squared, and p-value, providing information on the relationship strength and significance.

```         
Call:
lm(formula = metascore ~ price, data = video_games)

Residuals:
    Min      1Q  Median      3Q     Max 
-51.733  -5.839   1.267   7.373  28.592 

Coefficients:
            Estimate Std. Error t value            Pr(>|t|)    
(Intercept) 69.05248    0.37719 183.071 <0.0000000000000002 ***
price        0.17880    0.01976   9.048 <0.0000000000000002 ***
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 10.82 on 2689 degrees of freedom
  (23997 observations deleted due to missingness)
Multiple R-squared:  0.02955,   Adjusted R-squared:  0.02919 
F-statistic: 81.87 on 1 and 2689 DF,  p-value: < 0.00000000000000022
```

*Output Explanation*

-   **Coefficients**: The intercept and slope indicate that for every unit increase in `price`, the `metascore` is expected to increase by 0.1788 points, holding other variables constant.
-   **R-squared**: The R-squared of 0.02955 suggests that approximately 2.96% of the variance in `metascore` is explained by `price`, indicating a weak relationship.
-   **p-value**: A significant p-value ($p < 2.2 \times 10^{-16}$) suggests that `price` significantly predicts `metascore`.

The small effect size (low R-squared) implies that while `price` is a statistically significant predictor, it explains only a minor portion of the variation in `metascore`.

### Multiple Linear Regression {.unnumbered}

*Analysis Overview*

Multiple linear regression examines the relationship between a dependent variable and two or more independent variables. This analysis helps isolate the effects of each predictor on the outcome, accounting for other factors in the model.

**Example**: Using the `anime` dataset, we test if `score` can be predicted based on `scored_by` (number of reviews), `start_date`, and `members` (number of viewers).

*Type of Data*

-   **Dependent Variable**: Continuous data (e.g., `score`).
-   **Independent Variables**: Multiple continuous or categorical variables (e.g., `scored_by`, `start_date`, and `members`).

*R Code for Analysis*

In this example, multiple linear regression predicts `score` based on `scored_by`, `start_date`, and `members`.

```r
# Convert date to date data type
anime <- anime %>%
  mutate(start_date = as.Date(start_date))

# Perform multiple linear regression
lm_multiple <- lm(score ~ scored_by + start_date + members, data = anime)

# Display regression summary
summary(lm_multiple)
```

*Analysis Output*

The output includes coefficients, R-squared, and p-values for each predictor, illustrating the relationship between each independent variable and `score`.

```         
Call:
lm(formula = score ~ scored_by + start_date + members, data = anime)

Residuals:
    Min      1Q  Median      3Q     Max 
-5.7225 -0.4363  0.0767  0.5537  3.2840 

Coefficients:
                 Estimate    Std. Error t value            Pr(>|t|)    
(Intercept)  6.2131221386  0.0099159036  626.58 <0.0000000000000002 ***
scored_by   -0.0000127553  0.0000002001  -63.76 <0.0000000000000002 ***
start_date   0.0000284742  0.0000007224   39.42 <0.0000000000000002 ***
members      0.0000099941  0.0000001184   84.44 <0.0000000000000002 ***
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.8237 on 77516 degrees of freedom
  (391 observations deleted due to missingness)
Multiple R-squared:  0.2808,    Adjusted R-squared:  0.2808 
F-statistic: 1.009e+04 on 3 and 77516 DF,  p-value: < 0.00000000000000022
```

*Output Explanation*

-   **Coefficients**: Estimates show the effect of each predictor on `score`, holding other variables constant. For example, each unit increase in `members` corresponds to an increase of 9.994e-06 in `score`.
-   **R-squared**: Approximately 28.08% of the variance in `score` is explained by the model, indicating a moderate relationship.
-   **p-value**: The p-values indicate that all predictors (`scored_by`, `start_date`, and `members`) significantly contribute to predicting `score`.

A moderate R-squared suggests a meaningful, though not strong, model fit. This indicates that these variables together explain a notable portion of the variation in `score`.

### Logistic Regression {.unnumbered}

*Analysis Overview*

Logistic regression models the probability of a binary outcome based on one or more predictor variables. It is particularly useful in communication studies for predicting categorical outcomes, such as user behavior or preferences.

**Example**: Using the `anime` dataset, we predict the likelihood of an anime airing (`airing` as binary outcome) based on `rank` and `members`.

*Type of Data*

-   **Dependent Variable**: Binary or dichotomous (e.g., airing/not airing).
-   **Independent Variables**: Continuous or categorical predictors (e.g., `rank`, `members`).

*R Code for Analysis*

This example uses logistic regression to predict the probability of an anime being currently airing based on `rank` and `members`.

```r
# Perform logistic regression
logit_model <- glm(airing ~ rank + members, data = anime, family = "binomial")

# Display regression summary
summary(logit_model)
```

*Analysis Output*

The output includes the coefficients, z-values, and p-values for each predictor, indicating their effect on the probability of the outcome.

```         
Call:
glm(formula = airing ~ rank + members, family = "binomial", data = anime)

Coefficients:
                 Estimate    Std. Error z value            Pr(>|z|)    
(Intercept) -4.6602457047  0.0600857359 -77.560 <0.0000000000000002 ***
rank         0.0001185663  0.0000074833  15.844 <0.0000000000000002 ***
members      0.0000001570  0.0000002179   0.721               0.471    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

(Dispersion parameter for binomial family taken to be 1)

    Null deviance: 13892  on 77910  degrees of freedom
Residual deviance: 13607  on 77908  degrees of freedom
AIC: 13613

Number of Fisher Scoring iterations: 7
```

*Output Explanation*

-   **Coefficients**: The coefficients represent the log odds of the outcome (airing status) for each predictor. For example, each one-unit increase in `rank` increases the log odds of airing by 1.186e-04.
-   **z-value and p-value**: The significant p-value for `rank` ($p < 2e-16$) indicates that `rank` is a statistically significant predictor of whether an anime is currently airing. Conversely, the p-value for `members` (p = 0.471) suggests that `members` is not a statistically significant predictor in this model.
-   **Deviance**: The null deviance represents the deviance of a model with only an intercept, while the residual deviance shows the deviance of the fitted model. A lower residual deviance compared to the null deviance indicates that the model with predictors fits better than a model without them. In this case, the reduction from the null deviance (13892) to the residual deviance (13607) indicates an improvement in fit.
-   **AIC**: The Akaike Information Criterion (AIC) is a measure of model quality that considers both goodness of fit and model complexity. Lower AIC values generally indicate a better-fitting model when comparing similar models.

Overall, this logistic regression model shows that `rank` is a significant predictor of an anime’s airing status, whereas `members` does not significantly contribute to predicting this outcome. The model fit, indicated by the deviance reduction and AIC value, suggests that `rank` helps explain some of the variability in the airing status of anime, although further predictors may improve the model.


