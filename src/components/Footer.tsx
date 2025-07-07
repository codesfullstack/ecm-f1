import { Container, Grid, Typography, Button, Divider } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#232323', padding: "40px 0", color: "#FFFFFFB3", textAlign: "left" }}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <Typography variant="h5" style={{ marginBottom: "15px", color: "#FFFFFF" }}>
                Categories
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                Electronics
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                Jewelery
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                Men's Clothing
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "0px" }}>
                Women's Clothing
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <Typography variant="h5" style={{ marginBottom: "15px", color: "#FFFFFF" }}>
                Services
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                Expenses Tracking
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                Budget Planning
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                Reports
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <Typography variant="h5" style={{ marginBottom: "15px", color: "#FFFFFF" }}>
                About Us
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                Contact Us
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                Privacy Policy
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <Typography variant="h5" style={{ marginBottom: "15px", color: "#FFFFFF" }}>
                Connect With Us
              </Typography>
              <div style={{ alignItems: "center" }}>
                <a href="#" style={{ marginRight: "10px" }}>
                  <Facebook style={{ color: "white", fontSize: "24px" }} />
                </a>
                <a href="#" style={{ marginRight: "10px" }}>
                  <Twitter style={{ color: "white", fontSize: "24px" }} />
                </a>
                <a href="#" style={{ marginRight: "10px" }}>
                  <Instagram style={{ color: "white", fontSize: "24px" }} />
                </a>
                <a href="#">
                  <LinkedIn style={{ color: "white", fontSize: "24px" }} />
                </a>
              </div>
              <Button
                variant="outlined"
                color="secondary"
                href="#"
                style={{ color: "white", borderColor: "white", marginTop: "15px", marginBottom: '5px' }}
              >
                Subscribe
              </Button>
            </div>
          </Grid>
        </Grid>
        <Divider style={{ backgroundColor: 'white', marginTop: '18px' }} />
        <Typography variant="body2" style={{ textAlign: "left", marginTop: "18px", color: "#FFFFFF" }}>
          &copy; {currentYear} ECM. All Rights Reserved
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;