import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import Grid from "@mui/material/Grid";
import { useGlobalCartContext } from "../Context/Context";
import { Box } from "@mui/joy";
import TablePagination from "@mui/material/TablePagination";

export default function HomePage() {
  const { darkMode, products, searchQuery, setSearchedData, selectedCategory } =
    useGlobalCartContext();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    const newPage = Math.floor((page * rowsPerPage) / newRowsPerPage);
    setRowsPerPage(newRowsPerPage);
    setPage(newPage);
  };

  const setSingleMovie = (item) => {
    // console.log(item);
  };

  const productsState = React.useMemo(() => {
    if (searchQuery === "" && selectedCategory === "") {
      return products;
    } else {
      const searchedProducts = products?.filter(
        (product) =>
          product?.name
            .trim()
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase()) ||
          product?.brand
            .trim()
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase()) ||
          product?.category
            .trim()
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase()) ||
          product?.sale_price.toString().includes(searchQuery.trim()) ||
          product?.Stocks.toString().includes(searchQuery.trim())
      );
      return searchedProducts;
    }
  }, [products, searchQuery, selectedCategory]);

  console.log(productsState);

  React.useEffect(() => {
    setPage(0);
    setRowsPerPage(8);
    setSearchedData(productsState);
  }, [productsState, searchQuery, setSearchedData]);

  return (
    <Box sx={{ pt: 14 }}>
      {productsState?.length > 0 && (
        <>
          <Grid container sx={{ flexGrow: 1, mt: 2 }}>
            {productsState
              ?.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((item, index) => {
                const stockQuantity = item?.Stocks;
                const message =
                  stockQuantity > 50
                    ? `<b>${stockQuantity}</b> left in stock!`
                    : stockQuantity > 0
                    ? `Only <b>${stockQuantity}</b> left in stock!`
                    : "<b>Out of stock</b>";
                const totalDiscountPercentage = Math.floor(
                  ((item?.list_price - item?.sale_price) / item?.list_price) *
                    100
                );
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={index}
                    justifyContent={"center"}
                    display={"grid"}
                  >
                    <Card
                      sx={{
                        width: 275,
                        maxWidth: "100%",
                        boxShadow: "lg",
                        mb: 3,
                        bgcolor: darkMode && "#212121",
                      }}
                      onClick={() => {
                        item.Stocks > 0 && setSingleMovie(item);
                      }}
                    >
                      <CardOverflow>
                        <AspectRatio sx={{ minWidth: 200 }}>
                          <img
                            src={item?.image_url}
                            srcSet={item?.image_url}
                            loading="lazy"
                            alt=""
                            style={{
                              objectFit: "contain",
                              width: "100%",
                              backgroundColor: darkMode && "#212121",
                            }}
                          />
                        </AspectRatio>
                      </CardOverflow>
                      <CardContent>
                        <Typography
                          textColor={darkMode && "success.softHoverBg"}
                          level="body-xs"
                        >
                          {item?.brand}
                        </Typography>
                        <Link
                          fontWeight="md"
                          color="neutral"
                          textColor={darkMode ? "common.white" : "common.black"}
                          overlay
                        >
                          {item?.name}
                        </Link>

                        <Typography
                          textColor={darkMode && "background.level3"}
                          sx={{ mt: 1 }}
                        >
                          M.R.P. <s>{item?.list_price}</s>
                        </Typography>
                        <Typography
                          textColor={darkMode && "common.white"}
                          level="title-lg"
                          sx={{ fontWeight: "xl" }}
                          endDecorator={
                            totalDiscountPercentage > 30 && (
                              <Chip
                                component="span"
                                size="sm"
                                variant="soft"
                                color="success"
                              >
                                Lowest price
                              </Chip>
                            )
                          }
                        >
                          {item?.sale_price} ₹
                        </Typography>
                        <Typography level="body-sm">
                          {
                            <span
                              style={{ color: darkMode && "#daebdf" }}
                              dangerouslySetInnerHTML={{ __html: message }}
                            />
                          }
                        </Typography>
                      </CardContent>
                      <CardOverflow>
                        <Button
                          disabled={item?.Stocks === 0}
                          variant="solid"
                          color="danger"
                          size="lg"
                        >
                          {item?.Stocks === 0 ? "Not Available" : "Add to cart"}
                        </Button>
                      </CardOverflow>
                    </Card>
                  </Grid>
                );
              })}

            {products.length === 0 && <h1>No Data Found</h1>}
          </Grid>
          <TablePagination
            sx={{
              color: darkMode && "white",
              "& .MuiTablePagination-selectIcon": {
                color: darkMode && "white",
              },
              textAlign: "center",
            }}
            component="div"
            count={productsState?.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[
              8,
              16,
              24,
              { label: "All", value: products?.length },
            ]}
          />
        </>
      )}

      {productsState?.length === 0 && (
        <Box sx={{ height: "100%" }}>
          <Typography
            sx={{ textAlign: "center" }}
            textColor={darkMode && "common.white"}
            level="h1"
            padding={8}
          >
            No Data Found
          </Typography>
        </Box>
      )}
    </Box>
  );
}
