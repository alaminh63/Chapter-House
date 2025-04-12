import React from "react";
import { useNavigate, useParams } from "react-router";
import { useGetSingleBookQuery } from "../../Redux/api/features/Book/bookManagementApi";
import LoadingPage from "../../component/LoadingPage/LoadingPage";
import { toast } from "sonner";
import { useAppSelector } from "../../Redux/hooks";
import { sonarId } from "../../utils/Fucntion/sonarId";
import { useTitle } from "../../component/hook/useTitle";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Box,
  Rating,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import StarIcon from "@mui/icons-material/Star";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import InventoryIcon from "@mui/icons-material/Inventory";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const StyledCardMedia = styled(CardMedia)({
  height: 500,
  objectFit: "cover",
  borderRadius: "12px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const BookDetail = () => {
  useTitle("Book Detail");

  const { user } = useAppSelector((state) => state.auth);

  const { _id } = useParams();

  const { data, isLoading } = useGetSingleBookQuery(_id);
  const book = data?.data;

  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingPage />;
  }

  const handleOrder = async () => {
    if (!user) {
      toast.error("You have to logged in first", { id: sonarId });
      return;
    }
    if (user && user?.role === "admin") {
      toast.error("You can't order as admin", { id: sonarId });
      return;
    }

    navigate(`/user-checkout/${_id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Card elevation={5} sx={{ borderRadius: "16px" }}>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <StyledCardMedia image={book?.imageUrl} title={book?.title} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h4" component="h2" fontWeight="bold">
                  {book?.title}
                </Typography>
                <Chip label={book?.category} color="secondary" icon={<InfoIcon />} />
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Rating name="book-rating" value={4.5} precision={0.5} readOnly icon={<StarIcon fontSize="medium" />} />
                <Typography variant="body2" color="text.secondary" ml={1}>
                  (4.5/5)
                </Typography>
              </Box>

              <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 2 }}>
                {book?.description}
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <LocalOfferIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    ${book?.price?.toFixed(2)}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <VerifiedUserIcon color="success" sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    Author: <Typography variant="subtitle2" component="span">{book?.author}</Typography>
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <InventoryIcon color="info" sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    Quantity Available: <Typography variant="subtitle2" component="span">{book?.quantity}</Typography>
                  </Typography>
                </Box>

                <Typography variant="caption">
                  Published: {new Date(book?.createdAt).toLocaleDateString()}
                </Typography>
              </Box>

              <Box>
                {book?.inStock ? (
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    startIcon={<ShoppingCartIcon />}
                    onClick={handleOrder}
                    sx={{
                      ":hover": {
                        backgroundColor: "green",
                        transform: "scale(1.05)",
                      },
                      transition: "transform 0.3s ease-in-out",
                    }}
                  >
                    Order Now
                  </Button>
                ) : (
                  <Button variant="outlined" color="error" size="large" disabled>
                    Out of Stock
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BookDetail;