# Descriptive Analysis

[[Chunk Version]](files/10-descriptive_stats-chunks.Rmd)

This chapter introduces the foundations of **descriptive statistics**, a crucial first step in any quantitative research process. Descriptive statistics allow researchers to **organize, summarize, and interpret** raw data in a meaningful way. Whether analyzing survey results, social media behavior, content patterns, or experimental responses, these techniques help transform large, unstructured datasets into understandable information.

The examples in this chapter use real survey data collected in 2015 from over 13,000 online gamers. The dataset includes psychological measures (such as anxiety, life satisfaction, and social phobia), gaming habits (such as hours played and streaming activity), and demographic information (such as age, gender, and location). These examples illustrate how descriptive statistics can provide initial insights before moving on to deeper inferential analyses.

------------------------------------------------------------------------

## Overview

Descriptive statistics are used to **summarize the main features of a dataset**. Instead of analyzing each data point individually, descriptive statistics allow researchers to observe patterns, identify central tendencies, and assess variability. These tools are especially useful when preparing data for publication, visualization, or further statistical testing.

In mass communication research, descriptive statistics can answer questions such as:

-   What is the average number of hours spent consuming media per day?
-   How many participants in a study identified as politically independent?
-   What percentage of respondents report high levels of life satisfaction?
-   How widely do responses vary on a measure of media trust?

By answering these types of questions, descriptive statistics play a foundational role in understanding audiences, assessing user behaviors, and exploring communication phenomena.

Descriptive statistics are particularly important for:

-   **Characterizing samples**: Understanding the demographic and behavioral characteristics of your respondents.
-   **Exploring variables**: Summarizing psychological measures, behavioral indicators, or content metrics.
-   **Checking assumptions**: Determining whether your data meet the requirements for later inferential tests.
-   **Communicating results**: Reporting clear and concise summaries in research papers, visualizations, and presentations.

For example, a researcher studying the effects of gaming on well-being may begin by reporting the **mean number of hours participants spend gaming per week**, the **standard deviation of their anxiety scores**, and the **frequency distribution of platforms used (e.g., PC, console, mobile)**. These summary statistics offer a snapshot of the sample and lay the groundwork for deeper analyses that follow.

Descriptive statistics are not used to draw conclusions beyond the data at hand. They do not test hypotheses or estimate population parameters. Instead, their power lies in providing a **clear and organized view of what the data reveal**—who the participants are, what they do, and how they respond.

The next sections walk you through the core types of descriptive statistics, how to compute them in R, and how to interpret the results in the context of media and communication research.

------------------------------------------------------------------------

## Basic Descriptive Statistics

Descriptive statistics help researchers make sense of raw data. While a spreadsheet of thousands of survey responses can feel overwhelming, descriptive statistics reduce that complexity by summarizing the data into clear, interpretable values. This section focuses on the **measures of central tendency**, which describe where the “center” of the data lies.

------------------------------------------------------------------------

### **Measures of Central Tendency** {.unnumbered}

**Central tendency** refers to the central or typical value of a distribution. When we ask, “How much does the average person play video games per week?” or “What is the typical life satisfaction score in a sample of gamers?”, we are referring to central tendency.

There are three main ways to describe the center of a dataset:

------------------------------------------------------------------------

#### 1. **Mean** – The Arithmetic Average {.unnumbered}

The **mean** is the most commonly used measure of central tendency. It is calculated by adding all of the values in a dataset and dividing by the number of values.

For example, if five gamers report playing 5, 10, 15, 20, and 25 hours per week, the mean would be:

$$
\text{Mean} = \frac{5 + 10 + 15 + 20 + 25}{5} = \frac{75}{5} = 15
$$

The mean is useful because it incorporates all values in the dataset. However, it can be heavily influenced by extreme scores (called **outliers**). For instance, if one gamer reports playing 100 hours per week, it will raise the mean significantly, even if most people play much less.

------------------------------------------------------------------------

#### 2. **Median** – The Middle Value {.unnumbered}

The **median** is the middle value in a list of numbers ordered from smallest to largest. If there is an odd number of values, it is the exact center. If there is an even number, the median is the average of the two middle values.

Using the earlier example: - Ordered hours: 5, 10, 15, 20, 25 - Median: 15 (the third number in the list)

If someone reported 100 hours, the new list would be: 5, 10, 15, 20, 25, 100\
- Median = (15 + 20)/2 = 17.5 (since there's an even number of values)

The **median is more resistant to outliers** than the mean and is often a better indicator of central tendency for skewed data (where most responses cluster at one end).

------------------------------------------------------------------------

#### 3. **Mode** – The Most Frequent Value {.unnumbered}

The **mode** is the value that appears most often in a dataset. Unlike the mean and median, the mode can be used with both numerical and categorical data.

Examples: - If most players report gaming on “PC,” then PC is the mode of the `Platform` variable. - If most participants report 20 hours of gameplay per week, then 20 is the mode of the `Hours` variable.

Note: A dataset can have no mode (if all values are unique), one mode (unimodal), or multiple modes (multimodal).

------------------------------------------------------------------------

### Calculating Central Tendency in R {.unnumbered}

We will now compute the **mean**, **median**, and **mode** for the variable `Hours`, which represents the number of hours each participant reported playing games in a typical week.

#### Load Required Packages {.unnumbered}

``` r
library(dplyr)   # For data manipulation
library(psych)   # For advanced descriptive functions
```

#### Load the Dataset {.unnumbered}

``` r
gaming_data <- read.csv("data.csv", encoding = "ISO-8859-1")
```

We use `read.csv()` to import the dataset, and we specify the encoding (`ISO-8859-1`) to avoid any problems with special characters that might be present in the file.

#### Compute the Mean {.unnumbered}

``` r
mean(gaming_data$Hours, na.rm = TRUE)
```

-   `gaming_data$Hours` selects the `Hours` column.
-   `na.rm = TRUE` tells R to ignore any missing values (NA = Not Available).
-   This command calculates the arithmetic average number of hours played per week across all participants.

------------------------------------------------------------------------

#### Compute the Median {.unnumbered}

``` r
median(gaming_data$Hours, na.rm = TRUE)
```

-   This command finds the middle value of the `Hours` variable, once the values are sorted from smallest to largest.

------------------------------------------------------------------------

#### Compute the Mode {.unnumbered}

``` r
describe(gaming_data$Hours)$mode
```

-   The `describe()` function from the `psych` package gives a full summary of a numeric variable.
-   `$mode` extracts just the mode value from the output.

**Important Note**: If there is no clear mode—meaning no single value appears more often than others—the mode will return `NULL`. This is not an error, but a sign that your data may be evenly distributed or multimodal.

### Sample Output (Based on Real Data) {.unnumbered}

``` r
mean(gaming_data$Hours, na.rm = TRUE)
# [1] 22.25

median(gaming_data$Hours, na.rm = TRUE)
# [1] 20

describe(gaming_data$Hours)$mode
# NULL (no mode detected due to high variability or uniform frequency)
```

------------------------------------------------------------------------

### When to Use Each Measure {.unnumbered}

| Measure | Best Used When... | Strengths | Limitations |
|----|----|----|----|
| **Mean** | Data are evenly distributed without outliers | Uses all data points | Sensitive to extreme values |
| **Median** | Data are skewed or contain outliers | Robust to outliers | Does not use all values |
| **Mode** | Identifying the most common response | Works with any data type | May not exist or may be multiple |

------------------------------------------------------------------------

### Summary {.unnumbered}

Understanding **measures of central tendency** helps researchers answer key questions about what is typical in their dataset. Whether reporting on media use, psychological scores, or demographics, central tendency offers a simple yet powerful summary.

In the next section, we will explore **measures of dispersion**, which tell us how much variability exists in our data—an equally important aspect of descriptive analysis.

------------------------------------------------------------------------

### **Measures of Dispersion** {.unnumbered}

While **measures of central tendency** tell us where the center of the data lies, **measures of dispersion** describe how spread out the values are around that center. In other words, dispersion helps answer questions like:

-   Do most people play a similar number of hours per week?
-   Are participants' anxiety scores tightly clustered or widely scattered?
-   How much variability exists in responses?

Understanding dispersion is essential for interpreting how consistent or diverse your data are. Two datasets can have the same mean but very different spreads. For example, imagine two groups of gamers:

-   Group A: 10, 11, 12, 13, 14 hours/week (low dispersion)
-   Group B: 2, 7, 12, 17, 22 hours/week (high dispersion)

Both groups have the same mean (12), but Group B’s gaming hours vary much more.

------------------------------------------------------------------------

#### Key Measures of Dispersion {.unnumbered}

There are several ways to quantify variability in a dataset. The most common are:

------------------------------------------------------------------------

#### 1. **Range** – The Total Spread {.unnumbered}

The **range** is the simplest measure of dispersion. It shows the distance between the smallest and largest values in a dataset.

$$
\text{Range} = \text{Maximum Value} - \text{Minimum Value}
$$

-   Example: If the lowest number of hours played is 0 and the highest is 8000, the range is 8000 hours.
-   Strength: Easy to compute.
-   Limitation: Extremely sensitive to outliers (e.g., one person reporting an exaggerated number of hours).

------------------------------------------------------------------------

#### 2. **Variance** – The Average Squared Deviation {.unnumbered}

The **variance** tells us how far each value in the dataset is from the mean, on average. It is calculated by:

1.  Subtracting the mean from each value
2.  Squaring the result (to avoid negative numbers)
3.  Averaging those squared differences

$$
\text{Variance} = \frac{\sum (x_i - \bar{x})^2}{n - 1}
$$

-   High variance means the values are spread out.
-   Low variance means the values are close to the mean.
-   Limitation: Because variance uses squared differences, the units are not intuitive (e.g., hours²).

------------------------------------------------------------------------

#### 3. **Standard Deviation (SD)** – The Average Distance from the Mean {.unnumbered}

The **standard deviation** is the square root of the variance. It tells you, in the same units as your original data, how far the typical value is from the mean.

-   SD is widely used because it is easy to interpret and scales with the data.
-   A small SD means most responses are close to the mean.
-   A large SD means responses vary widely.

------------------------------------------------------------------------

### Calculating Dispersion in R {.unnumbered}

Let’s calculate the **range**, **variance**, and **standard deviation** for the variable `Hours`, which records how many hours per week each participant reported gaming.

------------------------------------------------------------------------

#### Step 1: Load Required Packages {.unnumbered}

If you haven’t already loaded your packages, begin with:

``` r
library(dplyr)
library(psych)
```

#### Step 2: Load the Dataset {.unnumbered}

``` r
gaming_data <- read.csv("data.csv", encoding = "ISO-8859-1")
```

This loads the dataset of over 13,000 gamers from a 2015 survey.

------------------------------------------------------------------------

#### Step 3: Compute Dispersion Measures {.unnumbered}

``` r
# Standard deviation
sd(gaming_data$Hours, na.rm = TRUE)

# Variance
var(gaming_data$Hours, na.rm = TRUE)

# Range (returns minimum and maximum values)
range(gaming_data$Hours, na.rm = TRUE)
```

-   `na.rm = TRUE` tells R to ignore missing data (e.g., respondents who skipped the question).
-   `sd()` computes the standard deviation.
-   `var()` computes the variance.
-   `range()` gives the minimum and maximum values.

------------------------------------------------------------------------

### Sample Output {.unnumbered}

``` r
sd(gaming_data$Hours, na.rm = TRUE)
# [1] 70.2845

var(gaming_data$Hours, na.rm = TRUE)
# [1] 4939.911

range(gaming_data$Hours, na.rm = TRUE)
# [1]    0 8000
```

------------------------------------------------------------------------

### Interpretation {.unnumbered}

-   **Standard Deviation (70.28)**: On average, gamers’ weekly hours deviate from the mean by about 70 hours. This is quite large and suggests significant variation in how much participants play.
-   **Variance (4939.91)**: This value is large, but harder to interpret directly because it is in squared units (hours²).
-   **Range (0 to 8000)**: At least one participant reported 0 hours, and one reported 8000. The extreme value of 8000 is likely an outlier—possibly due to a data entry error or exaggeration.

------------------------------------------------------------------------

### Summary Table {.unnumbered}

| Statistic | Value | Interpretation |
|----|----|----|
| Standard Deviation | 70.28 | Large spread in gaming hours |
| Variance | 4939.91 | Used in advanced stats; not intuitive by itself |
| Range | 0 to 8000 | Suggests presence of extreme outliers |

------------------------------------------------------------------------

### Why Dispersion Matters {.unnumbered}

Understanding variability is critical in mass communication research. For example: - If two media campaigns have the same average reach but different levels of audience variability, one may be more consistent while the other is more polarized. - In psychological scales like anxiety or satisfaction, dispersion helps determine whether scores cluster tightly (indicating a uniform experience) or are widely spread (indicating diverse experiences).

Dispersion also informs the **reliability** of averages. A mean without knowing the standard deviation can be misleading.

------------------------------------------------------------------------

In the next section, we’ll explore how to describe **categorical variables** like gender, platform, and playstyle using frequencies and proportions.

------------------------------------------------------------------------

### **Describing Categorical Data** {.unnumbered}

So far, we’ve explored numeric variables like hours played and psychological scale scores. But what about variables that contain words instead of numbers—like a participant's **gender**, **gaming platform**, or **playstyle**? These are known as **categorical variables**.

Categorical data consist of values that represent types or categories rather than numbers. This kind of data is especially common in survey research. For example, respondents might choose a gender identity ("Male", "Female", "Other"), a gaming platform ("PC", "Console", "Mobile"), or their favorite game genre ("Shooter", "Role-Playing", "Strategy").

To summarize categorical variables, researchers use **frequencies** and **proportions**:

-   A **frequency** is simply a count of how many participants fall into each category.
-   A **proportion** shows what percentage of the total participants each category represents.

------------------------------------------------------------------------

#### Counting Gender Identities in the Dataset {.unnumbered}

Let’s start by counting how many participants in the survey identified as Male, Female, or Other.

``` r
# Frequency of gender identities
table(gaming_data$Gender)
```

This command returns a table showing how many times each gender appears in the dataset:

```         
Female   Male  Other 
   713  12699     52 
```

Out of 13,464 participants: - 713 identified as **Female** - 12,699 identified as **Male** - 52 identified as **Other**

------------------------------------------------------------------------

#### Calculating Proportions of Each Category {.unnumbered}

To make these numbers easier to interpret, we convert them into proportions (i.e., percentages of the total).

``` r
# Proportions of gender identities
prop.table(table(gaming_data$Gender))
```

This returns the following:

```         
   Female       Male      Other 
0.05296    0.94318   0.00386
```

Interpreted: - 5.3% of respondents identified as Female - 94.3% identified as Male - 0.4% identified as Other

These proportions help researchers quickly assess sample composition and detect any imbalance (e.g., a male-dominated sample in this case). Proportions are especially useful when comparing groups or visualizing results in bar charts or pie graphs.

------------------------------------------------------------------------

### Summary {.unnumbered}

| Gender | Frequency | Proportion |
|--------|-----------|------------|
| Male   | 12,699    | 94.3%      |
| Female | 713       | 5.3%       |
| Other  | 52        | 0.4%       |

------------------------------------------------------------------------

## Using `psych` for Descriptive Statistics

The [`psych`](https://cran.r-project.org/web/packages/psych/) package provides tools for describing and analyzing psychological and survey data. It is especially helpful for working with **scales**, like the GAD (Generalized Anxiety Disorder) scale, the SWL (Satisfaction with Life) scale, or the SPIN (Social Phobia Inventory). These instruments typically consist of multiple items rated on Likert scales, which are averaged or summed to produce a total score.

------------------------------------------------------------------------

### **Generating Descriptive Reports** {.unnumbered}

You can use the `describe()` function from the `psych` package to produce a complete summary of multiple variables at once.

``` r
# Descriptive statistics for all GAD items
psych::describe(gaming_data[, c("GAD1", "GAD2", "GAD3", "GAD4", "GAD5", "GAD6", "GAD7")])
```

This command generates the following for each item: - **n**: Number of valid responses - **mean**: Average score - **sd**: Standard deviation - **median**: Middle value - **min**/**max**: Range of possible scores (usually 0–3) - **skew** and **kurtosis**: Shape of the distribution - **se**: Standard error of the mean

Sample output (simplified):

| Item | n     | mean | sd   | median | min | max | skew | kurtosis |
|------|-------|------|------|--------|-----|-----|------|----------|
| GAD1 | 13464 | 0.86 | 0.93 | 1      | 0   | 3   | 0.92 | 0.00     |
| GAD2 | 13464 | 0.67 | 0.92 | 0      | 0   | 3   | 1.24 | 0.53     |
| GAD3 | 13464 | 0.97 | 0.98 | 1      | 0   | 3   | 0.74 | -0.51    |

These values let us evaluate whether items are consistently used and where most responses fall.

------------------------------------------------------------------------

### **Exploring Key Psychometric Properties** {.unnumbered}

We can use `rowwise()` and `mutate()` to calculate total or average scores for a scale across its items.

#### Create a Composite Score for GAD

``` r
# Create average GAD score for each participant
gaming_data <- gaming_data %>%
  rowwise() %>%
  mutate(GAD_score = mean(c_across(GAD1:GAD7), na.rm = TRUE))
```

This code: - Uses `rowwise()` to calculate scores for each participant individually - Uses `c_across()` to access all 7 GAD items - Calculates the **average GAD score** per participant

We can now describe the resulting composite variable:

``` r
describe(gaming_data$GAD_score)
```

Sample summary:

| n     | mean | sd   | median | min | max | skew | kurtosis |
|-------|------|------|--------|-----|-----|------|----------|
| 13464 | 0.74 | 0.67 | 0.57   | 0   | 3   | 1.17 | 0.92     |

This tells us that the average GAD score across all participants was **0.74** on a 0–3 scale, suggesting that symptoms of anxiety were relatively low on average in this sample.

------------------------------------------------------------------------

### **Reporting Descriptive Statistics for Psychological Scales** {.unnumbered}

The same method can be used to compute scale scores for other psychological measures in the dataset.

``` r
# Compute average scores for SWL and SPIN
gaming_data <- gaming_data %>%
  rowwise() %>%
  mutate(
    SWL_score = mean(c_across(SWL1:SWL5), na.rm = TRUE),
    SPIN_score = mean(c_across(SPIN1:SPIN17), na.rm = TRUE)
  )
```

Now you have three scale scores: `GAD_score`, `SWL_score`, and `SPIN_score`.

------------------------------------------------------------------------

### **Preparing Summarized Data for Visualization and Further Analysis** {.unnumbered}

You can also group participants and summarize their data. For example, we can compare anxiety and gameplay hours by gender.

``` r
gaming_data %>%
  group_by(Gender) %>%
  summarize(
    avg_GAD = mean(GAD_score, na.rm = TRUE),
    avg_Hours = mean(Hours, na.rm = TRUE),
    count = n()
  )
```

Sample output:

| Gender | avg_GAD | avg_Hours | count |
|--------|---------|-----------|-------|
| Female | 1.09    | 19.21     | 713   |
| Male   | 0.72    | 21.73     | 12699 |
| Other  | 1.37    | 194.33    | 52    |

From this, we observe: - Female respondents reported slightly higher anxiety and slightly lower weekly gaming hours than males. - Participants identifying as Other reported both the highest anxiety and extremely high gaming hours, although the small sample size (n = 52) suggests caution in interpreting this result.

------------------------------------------------------------------------

## Creating Tables {.unnumbered}

Once you have calculated your descriptive statistics, the next step is to **present your findings clearly and effectively**. Tables are one of the most common ways to summarize and report results in research articles, presentations, and interactive dashboards.

This section introduces several R packages that help you create attractive, professional, and informative tables. Each package serves a different purpose:

-   `reactable` for interactive HTML tables
-   `gtsummary` for APA-style summary tables
-   `kableExtra` for custom formatting in reports
-   `flextable` for exporting to Word or PowerPoint

All examples use the `gaming_data` dataset, which includes demographics, psychological scale scores, and gaming habits of over 13,000 online gamers.

------------------------------------------------------------------------

### `reactable` – Interactive Tables for Web Apps {.unnumbered}

[`reactable`](https://glin.github.io/reactable/) is a package that creates interactive HTML tables with sorting, searching, and filtering features. These are ideal for dashboards, websites, or exploratory analysis in R Markdown documents.

``` r
library(reactable)

reactable(gaming_data %>% 
  select(Gender, Age, Hours, GAD_score) %>% 
  head(10))
```

#### What this code does: {.unnumbered}

-   Selects the first 10 participants (`head(10)`)
-   Displays their gender, age, weekly gaming hours, and GAD score
-   Renders the result as an interactive table

You can sort columns by clicking on headers, which is useful when browsing datasets with many rows.

------------------------------------------------------------------------

### `gtsummary` – Publication-Ready Summary Tables {.unnumbered}

[`gtsummary`](https://www.danieldsjoberg.com/gtsummary/) is designed to generate clean, publication-quality summary tables. It is especially useful for comparing groups (e.g., comparing means by gender).

``` r
library(gtsummary)

gaming_data %>%
  select(Gender, Age, Hours, GAD_score, SWL_score) %>%
  tbl_summary(by = Gender, missing = "no") %>%
  add_p()
```

#### What this code does: {.unnumbered}

-   Selects relevant variables for summary
-   Groups the data by `Gender` (e.g., Male, Female, Other)
-   Computes descriptive statistics for each group
-   Adds **p-values** to test whether the differences between groups are statistically significant

This type of table is perfect for inclusion in research papers where you compare subgroups on key variables.

------------------------------------------------------------------------

### `kableExtra` – Enhanced Tables for Academic Writing {.unnumbered}

[`kableExtra`](https://haozhu233.github.io/kableExtra/) enhances basic R tables (created using `knitr::kable`) with borders, alignment, and styling options. These are ideal for PDF or HTML reports generated in R Markdown.

``` r
library(knitr)
library(kableExtra)

summary_table <- gaming_data %>%
  group_by(Gender) %>%
  summarize(across(c(Age, Hours, GAD_score), ~mean(.x, na.rm = TRUE)))

kable(summary_table, caption = "Average Scores by Gender") %>%
  kable_styling()
```

#### What this code does: {.unnumbered}

-   Groups data by gender
-   Calculates the **mean Age, Hours, and GAD score** for each group
-   Creates a basic table using `kable()`
-   Applies styling using `kable_styling()` for better formatting

This is an excellent tool for customizing tables to match journal or classroom submission guidelines.

------------------------------------------------------------------------

### `flextable` – Word and PowerPoint Integration {.unnumbered}

[`flextable`](https://davidgohel.github.io/flextable/) is designed for outputting tables to Word documents and PowerPoint presentations. If you’re preparing a research poster or a report for a non-technical audience, this package is a powerful choice.

``` r
library(flextable)

summary_table %>%
  flextable() %>%
  set_caption("Average Hours and Anxiety Scores by Gender")
```

#### What this code does: {.unnumbered}

-   Uses the `summary_table` previously created
-   Converts it into a `flextable` object
-   Adds a caption for clarity

`flextable` outputs can be directly exported to Word or PowerPoint using the `officer` package, making it easy to integrate formatted results into a polished deliverable.

------------------------------------------------------------------------

### Summary {.unnumbered}

| Package      | Best For                                 | Output Format |
|--------------|------------------------------------------|---------------|
| `reactable`  | Interactive web-based data exploration   | HTML          |
| `gtsummary`  | APA-style summary tables with statistics | HTML, PDF     |
| `kableExtra` | Custom tables for academic reports       | PDF, HTML     |
| `flextable`  | Exporting to Word or PowerPoint          | DOCX, PPTX    |

Each tool supports a different stage of the research process, from internal data review to final presentation. As you progress through the course, you’ll use these packages to report your survey results with professionalism and clarity.
