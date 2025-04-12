import React, { useEffect, useState } from "react";
import LoadingPage from "../../component/LoadingPage/LoadingPage";
import { useGetAllBookQuery } from "../../Redux/api/features/Book/bookManagementApi";
import { useNavigate } from "react-router";
import { TBook } from "../../utils/Types/GlobalType";
import { useTitle } from "../../component/hook/useTitle";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Pagination,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BookIcon from "@mui/icons-material/Book";
import CategoryIcon from "@mui/icons-material/Category";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SortIcon from "@mui/icons-material/Sort";
import FilterListIcon from "@mui/icons-material/FilterList";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontWeight: "bold",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:first-child td": {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
  },
}));

const AllBooks = () => {
  useTitle("All Books");
  const navigate = useNavigate();

  // State for filters
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [inStock, setInStock] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fetch books with filters and pagination
  const {
    data: bookData,
    isLoading,
    error,
    refetch, // Add refetch to manually trigger the query
  } = useGetAllBookQuery(
    Object.fromEntries(
      Object.entries({
        ...(searchTerm && { searchTerm }),
        ...(category && { category }),
        ...(author && { author }),
        ...(minPrice && { minPrice: String(minPrice) }),
        ...(maxPrice && { maxPrice: String(maxPrice) }),
        ...(inStock !== "" && { inStock: String(inStock) }),
        ...(sortBy && { sortBy }),
        ...(sortOrder && { sortOrder }),
        page: currentPage,
        limit: 10, // Increased limit for a better view
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      }).filter(([_, v]) => v !== undefined) // Filter out undefined values
    )
  );

  // Handle API Error
  useEffect(() => {
    if (error) {
      toast.error("Error while fetching books");
    }
  }, [error]);

  const books = bookData?.data || [];
  const totalPages = bookData?.pagination?.totalPages || 1;

  // Handle search/filter changes
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleGoDetail = (_id: string) => {
    navigate(`/book-detail/${_id}`);
  };

  const handlePageChange = (event: any, value: number) => {
    setCurrentPage(value);
  };

  // Effect to reset current page to 1 on filter changes
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [
    searchTerm,
    category,
    author,
    minPrice,
    maxPrice,
    inStock,
    sortBy,
    sortOrder,
  ]);

  const handleRefetch = () => {
    refetch(); // Manually trigger the query refetch
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen p-4">
      <Grid container spacing={3} sx={{ padding: "20px" }}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            <BookIcon sx={{ mr: 1 }} /> All Books
          </Typography>
        </Grid>

        {/* Filters Section */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <FilterListIcon sx={{ mr: 1 }} /> Filters
                <IconButton aria-label="refetch" onClick={handleRefetch}>
                  <AutorenewIcon />
                </IconButton>
              </Typography>
              <Grid container spacing={2}>
                {/* Search Book */}
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Search by title, author, or category"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                    InputProps={{
                      startAdornment: <SearchIcon />,
                    }}
                  />
                </Grid>

                {/* Category Filter */}
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="category-label">
                      <CategoryIcon sx={{ mr: 1 }} /> Category
                    </InputLabel>
                    <Select
                      labelId="category-label"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      label="Category"
                    >
                      <MenuItem value="">Select Category</MenuItem>
                      <MenuItem value="Science">Science</MenuItem>
                      <MenuItem value="Fiction">Fiction</MenuItem>
                      <MenuItem value="Religious">Religious</MenuItem>
                      <MenuItem value="Poetry">Poetry</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Author Filter */}
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Author"
                    variant="outlined"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </Grid>

                {/* Price Range Filter */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Min Price"
                    variant="outlined"
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Max Price"
                    variant="outlined"
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </Grid>

                {/* In Stock Filter */}
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="in-stock-label">In Stock</InputLabel>
                    <Select
                      labelId="in-stock-label"
                      value={inStock}
                      onChange={(e) => setInStock(e.target.value)}
                      label="In Stock"
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="true">In Stock</MenuItem>
                      <MenuItem value="false">Out of Stock</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Sort By */}
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="sort-by-label">
                      <SortIcon sx={{ mr: 1 }} /> Sort By
                    </InputLabel>
                    <Select
                      labelId="sort-by-label"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      label="Sort By"
                    >
                      <MenuItem value="">Default</MenuItem>
                      <MenuItem value="title">Title</MenuItem>
                      <MenuItem value="price">Price</MenuItem>
                      <MenuItem value="quantity">Quantity</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Sort Order */}
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="sort-order-label">Order</InputLabel>
                    <Select
                      labelId="sort-order-label"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      label="Order"
                    >
                      <MenuItem value="">Default</MenuItem>
                      <MenuItem value="asc">Ascending</MenuItem>
                      <MenuItem value="desc">Descending</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Books Table */}
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell>Image</StyledTableCell>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell>Brand</StyledTableCell>
                  <StyledTableCell>Author</StyledTableCell>
                  <StyledTableCell>Category</StyledTableCell>
                  <StyledTableCell>Model</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                  <StyledTableCell>Quantity</StyledTableCell>
                  <StyledTableCell>Available</StyledTableCell>
                  <StyledTableCell>Detail</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((data: TBook, idx: number) => (
                  <StyledTableRow key={idx}>
                    <TableCell component="th" scope="row">
                      {idx + 1}
                    </TableCell>
                    <TableCell>
                      <img
                        src={data?.imageUrl}
                        alt={data?.title}
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                    </TableCell>
                    <TableCell>{data?.title}</TableCell>
                    <TableCell>{data?.brand}</TableCell>
                    <TableCell>{data?.author}</TableCell>
                    <TableCell>{data?.category}</TableCell>
                    <TableCell>{data?.model}</TableCell>
                    <TableCell>${data?.price}</TableCell>
                    <TableCell>{data?.quantity}</TableCell>
                    <TableCell>
                      {data?.inStock ? (
                        <span style={{ color: "green" }}>Yes</span>
                      ) : (
                        <span style={{ color: "red" }}>No</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="details"
                        onClick={() => handleGoDetail(data?._id)}
                      >
                        <VisibilityIcon color="primary" />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Pagination */}
        <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default AllBooks;