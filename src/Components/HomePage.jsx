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
  const { darkMode, products } = useGlobalCartContext();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const length = products?.length || -1;

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
  return (
    <Box sx={{ pt: 8 }}>
      <Grid container sx={{ flexGrow: 1, mt: 2 }}>
        {console.log(products)}
        {products
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
              ((item?.list_price - item?.sale_price) / item?.list_price) * 100
            );

            console.log(totalDiscountPercentage);
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
        count={products?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[8, 16, 24, length]}
      />
    </Box>
  );
}
