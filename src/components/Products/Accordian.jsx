import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ENDPOINTS } from "../../api/api";

function ProductAccordion({ productId }) {
  const [expanded, setExpanded] = React.useState(false);
  const [product, setProduct] = React.useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  22;

  React.useEffect(() => {
    if (!productId) return; // ✅ prevent API call if no productId yet
    async function fetchProduct() {
      try {
        const res = await fetch(ENDPOINTS.GET_PRODUCT(productId));
        const data = await res.json();

        if (data.key_features)
          data.key_features = data.key_features.replace(/\n/g, "<br />");
        if (data.ingredients)
          data.ingredients = data.ingredients.replace(/\n/g, "<br />");

        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    }
    fetchProduct();
  }, [productId]); // ✅ refetch when productId changes

  if (!product)
    return (
      <Typography
        className="text-gray-500 text-center py-10"
        sx={{ fontFamily: "Poppins, sans-serif" }}
      >
        Loading product data...
      </Typography>
    );

  const accordionStyles = {
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginBottom: "1rem",
    backgroundColor: "#fff",
    border: "none",
    "&:before": { display: "none" },
    width: "100%",
  };

  const summaryStyles = {
    fontWeight: 600,
    fontSize: "1.05rem",
    color: "#1f2937",
    fontFamily: "Poppins, sans-serif",
  };

  const detailsStyles = {
    fontSize: "0.95rem",
    color: "#4b5563",
    lineHeight: 1.6,
    fontFamily: "Poppins, sans-serif",
  };

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8">
      {product.key_features && (
        <Accordion
          expanded={expanded === "keyFeatures"}
          onChange={handleChange("keyFeatures")}
          TransitionProps={{ timeout: 500 }}
          sx={accordionStyles}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#284A45" }} />}
            aria-controls="keyFeatures-content"
            id="keyFeatures-header"
          >
            <Typography sx={summaryStyles}>Key Features</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              component="div"
              sx={{ ...detailsStyles, lineHeight: 2.1 }}
              dangerouslySetInnerHTML={{ __html: product.key_features }}
            />
          </AccordionDetails>
        </Accordion>
      )}

      {product.attributes && Object.keys(product.attributes).length > 0 && (
        <Accordion
          expanded={expanded === "nutrition"}
          onChange={handleChange("nutrition")}
          TransitionProps={{ timeout: 500 }}
          sx={accordionStyles}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#284A45" }} />}
            aria-controls="nutrition-content"
            id="nutrition-header"
          >
            <Typography sx={summaryStyles}>
              Nutrition Information (per serving 28g)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <table
              style={{
                width: "30%", // shrink table to content
                borderCollapse: "collapse",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "4px 8px",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      minWidth: "140px", // keeps Nutrient column neat
                    }}
                  >
                    Nutrient
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "4px 8px",
                      fontWeight: 600,
                    }}
                  >
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(product.attributes).map(
                  ([attrName, values]) => (
                    <tr key={attrName}>
                      <td
                        style={{
                          fontWeight: 500,
                          padding: "4px 8px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {attrName}
                      </td>
                      <td
                        style={{
                          padding: "4px 8px",
                          fontWeight: 500,
                        }}
                      >
                        {values.join(", ")}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </AccordionDetails>
        </Accordion>
      )}

      {product.ingredients && (
        <Accordion
          expanded={expanded === "ingredients"}
          onChange={handleChange("ingredients")}
          TransitionProps={{ timeout: 500 }}
          sx={accordionStyles}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#284A45" }} />}
            aria-controls="ingredients-content"
            id="ingredients-header"
          >
            <Typography sx={summaryStyles}>Ingredients</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              component="div"
              sx={detailsStyles}
              dangerouslySetInnerHTML={{ __html: product.ingredients }}
            />
          </AccordionDetails>
        </Accordion>
      )}

      {/* Storage Accordion */}
      <Accordion
        expanded={expanded === "storage"}
        onChange={handleChange("storage")}
        TransitionProps={{ timeout: 500 }}
        sx={accordionStyles}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "#284A45" }} />}
          aria-controls="storage-content"
          id="storage-header"
        >
          <Typography sx={summaryStyles}>Storage</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={detailsStyles}>
            Store in a cool, dry, and hygienic place. Keep away from direct
            sunlight.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Manufacturer Accordion */}
      <Accordion
        expanded={expanded === "manufacturer"}
        onChange={handleChange("manufacturer")}
        TransitionProps={{ timeout: 500 }}
        sx={accordionStyles}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "#284A45" }} />}
          aria-controls="manufacturer-content"
          id="manufacturer-header"
        >
          <Typography sx={summaryStyles}>Manufacturer</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={detailsStyles}>
            Dantaline Ventures Pvt. Ltd., Panampilly Nagar, Ernakulam, Kerala.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FSSAI Accordion */}
      <Accordion
        expanded={expanded === "FSSAI"}
        onChange={handleChange("FSSAI")}
        TransitionProps={{ timeout: 500 }}
        sx={accordionStyles}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "#284A45" }} />}
          aria-controls="FSSAI-content"
          id="FSSAI-header"
        >
          <Typography sx={summaryStyles}>FSSAI Lic No</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={detailsStyles}>11325999000206</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default ProductAccordion;
