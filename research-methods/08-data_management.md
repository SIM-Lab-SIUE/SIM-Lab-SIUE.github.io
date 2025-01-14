---
output: html_document
editor_options: 
  chunk_output_type: inline
---

# Data Management

[[Chunk Version]](_book/files/08-data_management-chunks.Rmd)

## Defining Data

### What is Data? {.unnumbered}

In research, data refers to information collected to answer questions, test hypotheses, or explore patterns. Data can take many forms---numbers, text, images---and understanding these forms is essential for effective analysis. In RStudio, data is organized in tables (data frames), where rows represent individual observations, and columns represent variables.

### What is Data in Mass Communication Research? {.unnumbered}

In mass communication research, data can come from various sources, including audience metrics, media content, or public opinion surveys. For example, the **IMDb_Economist_tv_ratings.csv** dataset contains information about TV shows, such as titles, seasons, average ratings, audience share, and genres. These data points can be used to analyze audience preferences, media reception, or trends across different types of programming.

### Qualitative vs. Quantitative Data {.unnumbered}

In mass communication research, data can be classified as either qualitative or quantitative.

-   **Qualitative Data**: Qualitative data are non-numerical and often textual or categorical. In the **IMDb_Economist_tv_ratings.csv** dataset, variables such as `title` and `genres` are qualitative. These data provide descriptive details, helping researchers interpret cultural themes or trends in media content. For example, the `genres` variable includes values like "Drama," "Mystery," and "Sci-Fi," which categorize each show based on its narrative content.

-   **Quantitative Data**: Quantitative data are numerical and can be measured or counted. These data are used to perform statistical analyses. In the **IMDb_Economist_tv_ratings.csv** dataset, variables such as `av_rating` (average rating) and `share` (audience share) are quantitative. These values allow researchers to explore trends and relationships using statistical methods, such as analyzing how audience ratings vary by genre or season.

## Variables and Observations

In RStudio, datasets are organized in a tabular format, where **columns represent variables** and **rows represent observations**.

-   **Variables**: Variables represent the characteristics or attributes being measured. In the **IMDb_Economist_tv_ratings.csv** dataset, variables include `title`, `seasonNumber`, `av_rating`, `share`, and `genres`. Each variable holds a specific type of information. For example, the `av_rating` variable represents the average IMDb rating for each TV show, while `genres` lists the categories of the show.

-   **Observations**: Observations are individual data points in the dataset. In this dataset, each row represents a unique combination of a TV show and its season. For example, one observation might represent Season 1 of "12 Monkeys," with its corresponding `av_rating` and `share`. These rows are the building blocks for data analysis, as they provide the raw material that is examined and processed.

### Explanation of Data Types {.unnumbered}

Different types of data are used in mass communication research, each requiring different methods of analysis. Here's how the data types in the **IMDb_Economist_tv_ratings.csv** dataset break down:

-   **Nominal Data**: Nominal data are qualitative and label variables without any inherent order. The `title` variable is an example of nominal data, as it categorizes the different TV shows without implying any ranking or hierarchy.

-   **Categorical Data**: Categorical data can be grouped into categories but have no specific numerical meaning. In this dataset, the `genres` variable is categorical, as it groups shows into different genre categories like "Drama," "Mystery," or "Sci-Fi."

-   **Ordinal Data**: Ordinal data are categorical but have a defined order. While there are no ordinal variables in this specific dataset, an example might be a variable representing user rankings (e.g., "Poor," "Average," "Good").

-   **Interval Data**: Interval data represent ordered values where the differences between values are meaningful, but there is no true zero point. In this dataset, `av_rating` could be considered interval data, as it represents IMDb ratings on a scale where the differences between values are consistent, but there is no absolute zero.

-   **Continuous Data**: Continuous data can take any value within a given range. The `share` variable (audience share) is an example of continuous data because it represents the percentage of the total audience, which can vary across a continuous spectrum.

-   **Dichotomous or Binary Data**: Dichotomous data have only two possible values, such as "yes/no" or "true/false." Although this dataset does not contain any binary variables, a typical example might be whether a show was renewed for another season (Yes/No).

## Inputting Data

In RStudio, entering and importing data are essential tasks for conducting research. This section introduces DataEditR for manual data input and covers methods for importing data from external files like CSVs. The **IMDb_Economist_tv_ratings.csv** dataset is used in the examples below, which contains information about TV shows, including titles, seasons, ratings, and genres.

### Data Structures in R {.unnumbered}

Data structures are fundamental in R programming as they organize and store the data that one works with for analyses, visualizations, and other computational tasks. Understanding these structures is critical for effective manipulation of data and implementing various algorithms (Wickham & Grolemund, 2017). Below are the primary data structures that R provides.

#### Vectors {.unnumbered}

Vectors are one-dimensional arrays used to hold elements of a single data type. This could be numeric, character, or logical data types. Vectors are often used for operations that require the application of a function to each element in the data set (Maindonald & Braun, 2010).

Vectors can be created using the `c()` function, which combines elements into a vector.

*Creating a numeric vector*

``` r
numeric_vector <- c(1, 2, 3, 4, 5)
```

*Creating a character vector*

``` r
character_vector <- c("apple", "banana", "cherry")
```

*Creating a logical vector*

``` r
logical_vector <- c(TRUE, FALSE, TRUE)
```

You can perform various operations on vectors like addition, subtraction, or applying a function to each element.

``` r
# Adding two vectors
sum_vector <- numeric_vector + c(1, 1, 1, 1, 1)

# Calculating mean of a numeric vector
mean_value <- mean(numeric_vector)
```

#### Data Frames {.unnumbered}

Data frames serve as the fundamental data structure for data analysis in R. They are similar to matrices but allow different types of variables in different columns, which makes them extremely versatile (Chambers, 2008).

Data frames can be created using the `data.frame()` function.

``` r
# Creating a data frame
df <- data.frame(Name = c("Alice", "Bob"), Age = c(23, 45), Gender = c("F", "M"))
```

Various operations like subsetting, merging, and sorting can be performed on data frames.

``` r
# Subsetting data frame by column
subset_df <- df[, c("Name", "Age")]
```

#### Lists {.unnumbered}

Lists are an ordered collection of objects, which can be of different types and structures, including vectors, matrices, and even other lists (Wickham & Grolemund, 2017).

Lists can be created using the `list()` function.

``` r
# Creating a list
my_list <- list(Name = "Alice", Age = 23, Scores = c(90, 85, 88))
```

Lists can be modified by adding, deleting, or updating list elements.

``` r
# Updating a list element
my_list$Name <- "Bob"

# Adding a new list element
my_list$Email <- "bob@email.com"
```

By understanding these primary data structures, students in Mass Communications can gain a strong foundation for more complex data analyses relevant to their field, whether it involves analyzing large sets of textual data, audience metrics, or other forms of media data.

### DataEditR {.unnumbered}

**DataEditR** is a tool in R that allows for the manual input and editing of data through a spreadsheet-like interface. This is useful when entering small datasets or modifying data after import.

``` r
# Install DataEditR
# install.packages("DataEditR")

# Load package
library(DataEditR)
```

#### Manually Inputting Data {.unnumbered}

You can open an empty data editor and manually enter data in various ways:

``` r
# Open an empty data editor in a separate window
data_edit()

# Open the editor in the dialog pane
data_edit(viewer = 'dialog')

# Open the editor in the viewer pane
data_edit(viewer = 'viewer')

# Open the editor in a browser
data_edit(viewer = 'browser')

# Define the number of rows and columns (e.g., 20 rows and 15 columns)
data_edit(c(20, 15))
```

Once the data is entered, it can be saved in the R environment or to a file for future use:

``` r
# Open an empty data editor that saves data to the environment when closed
new_data <- data_edit()

# Open an empty data editor and save data to a CSV file when closed
data_edit(save_as = "new_data.csv")
```

### Importing Data from a File {.unnumbered}

When working with larger datasets, such as CSV files, importing data into R is more efficient. A CSV (Comma Separated Values) file stores tabular data as plain text, making it easy to exchange data between programs. Below are several ways to import the **IMDb_Economist_tv_ratings.csv** dataset into R.

#### Use `read.csv` from Base R {.unnumbered}

The `read.csv()` function is part of base R and can be used to import CSV files directly into your environment:

``` r
# Reading the IMDb_Economist_tv_ratings dataset using read.csv from base R
csv_base <- read.csv("https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2019/2019-01-08/IMDb_Economist_tv_ratings.csv", header = TRUE, stringsAsFactors = FALSE)
```

This code imports the dataset from the URL provided. The `header = TRUE` argument indicates that the first row contains variable names, and `stringsAsFactors = FALSE` prevents character strings from being converted to factors.

Use `write.csv()` to write a data frame to a csv.

#### Use `read_csv` from the `readr` Package {.unnumbered}

The `readr` package provides an alternative function, `read_csv()`, which offers better performance and flexibility:

``` r
# Install the readr package if it's not already installed
# install.packages("readr")

# Load the readr package
library(readr)

# Reading the IMDb_Economist_tv_ratings dataset using read_csv from readr
csv_readr <- read_csv("https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2019/2019-01-08/IMDb_Economist_tv_ratings.csv")
```

The `read_csv()` function is faster than `read.csv()` and automatically detects data types, making it easier to handle larger datasets efficiently.

Use `write_csv()` to write a data frame to a csv.

#### Use `fread` from the `data.table` Package {.unnumbered}

For very large datasets, `fread()` from the `data.table` package is a faster alternative:

``` r
# Install the data.table package if it's not already installed
# install.packages("data.table")

# Load the data.table package
library(data.table)

# Reading the IMDb_Economist_tv_ratings dataset using fread from data.table
csv_datatable <- fread("https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2019/2019-01-08/IMDb_Economist_tv_ratings.csv")
```

The `fread()` function provides high-speed reading for large CSV files, making it ideal for processing extensive datasets.

Use `fwrite()` to write a data frame to a csv.

#### Use `vroom,` from the `vroom` Package {.unnumbered}

The fastest method for reading rectangular data that I know of is `vroom()` from the `vroom` package:

``` r
# Install the data.table package if it's not already installed
# install.packages("vroom")

# Load the data.table package
library(vroom)

# Reading the IMDb_Economist_tv_ratings dataset using fread from data.table
csv_vroom <- vroom("https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2019/2019-01-08/IMDb_Economist_tv_ratings.csv")
```

The `vroom()` function provides the fastest current read for .csv files.

Use `vroom_write()` to write a data frame to a csv.

### Editing Imported Data {.unnumbered}

Once you have imported a dataset, you can use **DataEditR** to edit or modify the data directly within RStudio:

``` r
# Load the IMDb_Economist_tv_ratings dataset from an online file
imdb_ratings <- read_csv("https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2019/2019-01-08/IMDb_Economist_tv_ratings.csv")
```

``` r
# Open the data editor with the IMDb ratings data
data_edit(imdb_ratings)

# Open the data editor and save changes to the environment
imdb_ratings_new <- data_edit(imdb_ratings)  # Make edits, crop data to selection, and save to the environment

# Open the data editor and save changes to a file
data_edit(imdb_ratings, save_as = "imdb_ratings.csv")  # Make edits, crop to selection, and save to a CSV file
```

This allows you to refine and edit your data after importing it, ensuring that it's ready for analysis.

By mastering these techniques for manual data input and importing data from external files, researchers can efficiently work with a wide variety of datasets. Whether you are working with a small dataset entered manually or a large public dataset like the **IMDb_Economist_tv_ratings.csv**, RStudio provides flexible tools to help you manage your data.

## Manipulating Data

Data manipulation is a crucial aspect of preparing datasets for analysis. In RStudio, the **`dplyr`** package---part of the tidyverse ecosystem---provides powerful, intuitive functions for transforming, summarizing, and reshaping data. This section introduces `dplyr` and demonstrates how to manipulate data using examples from the **billboard** dataset, which contains information about songs, performers, and chart positions.

### The `dplyr` Package {.unnumbered}

#### Introducing Tidyverse {.unnumbered}

**Tidyverse** is a collection of R packages designed for data science, which share an underlying design philosophy and programming style. The `dplyr` package is part of the tidyverse and is widely used for data manipulation tasks such as filtering rows, selecting columns, grouping data, and summarizing statistics.

To get started, load the tidyverse (or specifically `dplyr`) into your R environment:

``` r
# Load the dplyr package
library(dplyr)
```

#### The Pipe Operator `%>%` {.unnumbered}

The pipe operator `%>%` is central to using `dplyr` and tidyverse functions. It allows you to pass the output of one function directly into another, creating a clear and concise workflow. Instead of nesting functions, you can chain them in a readable sequence. For example, instead of writing `summarize(group_by(billboard, song), avg = mean(peak_position))`, you can use pipes:

``` r
billboard %>%
  group_by(song) %>%
  summarize(avg_peak_position = mean(peak_position, na.rm = TRUE))
```

#### Important `dplyr` Commands {.unnumbered}

Below are the most important `dplyr` commands, demonstrated using the **billboard** dataset. Each function helps perform a specific task related to manipulating data.

**Getting Prepared**

Load the **billboard** dataset:

``` r
# Load the billboard dataset from an online source
billboard <- read.csv("https://raw.githubusercontent.com/rfordatascience/tidytuesday/refs/heads/master/data/2021/2021-09-14/billboard.csv")
```

**01. `summarize()`**

This command is used to create summary statistics for a given dataset or grouped data.

Example: Calculate the average peak position of all songs.

``` r
billboard %>%
  summarize(avg_peak_position = mean(peak_position, na.rm = TRUE))
```

**02. `count()`**

`count()` is used to tally occurrences of each unique value in a column.

Example: Count how many times each song appeared in the dataset.

``` r
billboard %>%
  count(song)
```

**03. `group_by()`**

`group_by()` is used to split the data into groups based on values of one or more columns, often followed by summary or transformation commands.

Example: Group the data by song and then summarize the average week position for each song.

``` r
billboard %>%
  group_by(song) %>%
  summarize(avg_week_position = mean(week_position, na.rm = TRUE))
```

**04. `ungroup()`**

`ungroup()` removes the grouping structure of the data, returning it to its original state.

Example: Ungroup the previously grouped data.

``` r
billboard %>%
  group_by(song) %>%
  summarize(avg_week_position = mean(week_position, na.rm = TRUE)) %>%
  ungroup()
```

**05. `mutate()`**

`mutate()` creates or modifies columns.

Example: Create a new column `weeks_left` which is 52 minus `weeks_on_chart`.

``` r
billboard %>%
  mutate(weeks_left = 52 - weeks_on_chart)
```

**06. `rowwise()`**

`rowwise()` allows operations to be applied to each row individually, useful for row-level transformations.

Example: Calculate a transformation for each row, such as the difference between current and previous week positions.

``` r
billboard %>%
  rowwise() %>%
  mutate(change_in_position = week_position - previous_week_position)
```

**07. `filter()`**

`filter()` selects rows that meet specific criteria.

Example: Filter songs that were in the top 10 positions.

``` r
billboard %>%
  filter(week_position <= 10)
```

**08. `distinct()`**

`distinct()` removes duplicate rows based on one or more columns.

Example: Select distinct songs.

``` r
billboard %>%
  distinct(song)
```

**09. `slice()`**

`slice()` selects rows based on their row number.

Example: Select the first five rows of the dataset.

``` r
billboard %>%
  slice(1:5)
```

**10. `slice_sample()`**

`slice_sample()` selects a random sample of rows.

Example: Randomly select 5 rows from the dataset.

``` r
billboard %>%
  slice_sample(n = 5)
```

**11. `slice_min()`, `slice_max()`, `slice_head()`, `slice_tail()`**

-   `slice_min()`: Selects rows with the minimum value in a column.
-   `slice_max()`: Selects rows with the maximum value in a column.
-   `slice_head()`: Selects the first few rows.
-   `slice_tail()`: Selects the last few rows.

Examples: Select the row with the lowest peak position.

``` r
billboard %>%
  slice_min(peak_position)
```

Select the row with the highest peak position.

``` r
billboard %>%
  slice_max(peak_position)
```

**12. `arrange()`**

`arrange()` orders the rows by values in specified columns.

Example: Order the songs by week position, in ascending order.

``` r
billboard %>%
  arrange(week_position)
```

**13. `desc()`**

`desc()` is used inside `arrange()` to sort in descending order.

Example: Order the songs by peak position, in descending order.

``` r
billboard %>%
  arrange(desc(peak_position))
```

**14. `pull()`**

`pull()` extracts a column as a vector.

Example: Extract the `song` column.

``` r
billboard %>%
  pull(song)
```

**15. `select()`**

`select()` picks specific columns from the dataset.

Example: Select the columns `song`, `performer`, and `peak_position`.

``` r
billboard %>%
  select(song, performer, peak_position)
```

**16. `relocate()`**

`relocate()` changes the order of columns.

Example: Move `peak_position` to be the first column.

``` r
billboard %>%
  relocate(peak_position, .before = song)
```

**17. `across()`**

`across()` applies a function to multiple columns.

Example: Standardize (center) both `week_position` and `peak_position`.

``` r
billboard %>%
  mutate(across(c(week_position, peak_position), scale))
```

**18. `c_across()`**

`c_across()` is used in rowwise operations to combine column values into one.

Example: Sum the values of `week_position` and `peak_position` for each row.

``` r
billboard %>%
  filter(week_position <= 10) %>%
  relocate(peak_position, .before = song) %>%
  rowwise() %>%
  mutate(total = sum(c_across(week_position:peak_position), na.rm = TRUE))
```

**19. `rename()`**

`rename()` changes the names of columns.

Example: Rename `song` to `track`.

``` r
billboard %>%
  rename(track = song)
```

**20. `n()`**

`n()` returns the number of rows in a group.

Example: Count the number of instances per performer.

``` r
billboard %>%
  group_by(performer) %>%
  summarize(count = n())
```

**21. `mean()`, `median()`, `sum()`, `sd()`**

These are functions to calculate the mean, median, sum, and standard deviation, often used within `summarize()` or `mutate()`.

Example: Find the mean and standard deviation of `peak_position`.

``` r
billboard %>%
  summarize(mean_peak = mean(peak_position, na.rm = TRUE), 
            sd_peak = sd(peak_position, na.rm = TRUE))
```
