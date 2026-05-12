import React, { useState } from 'react';
import {
  Page,
  Layout,
  Card,
  Text,
  Link,
  Button,
  Box,
  Grid,
  Modal,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productModalError, setProductModalError] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(true);

  const navigate = useNavigate();


  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setProducts([]);
    setProductModalError("");
    setSelectedProductId(null);
  };

  const handleOpenProductModal = async () => {
    setIsProductModalOpen(true);
    setIsLoadingProducts(true);
    setProductModalError("");

    try {
      const response = await fetch("/api/products/list");
      if (!response.ok) {
        throw new Error("Unable to load products");
      }
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      setProductModalError(error.message || "Unable to load products");
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleProductSelection = (productId) => {
    setSelectedProductId(productId);
  };

  const handleContinue = () => {
    if (selectedProductId) {
      // Extract only numeric ID from gid
      const productId = selectedProductId.split("/").pop();

      console.log(productId);

      navigate(`/virtualoptions?productId=${productId}`);
    }
  };

  return (
    <Page>
      <TitleBar title="Variance App" />
      <Layout>
        {/* Getting Started Section */}
        <Layout.Section>
          <Card sectioned>
            <Box paddingBlockEnd="4">
              <Text as="h2" variant="headingMd" style={{ fontWeight: '700', color: '#1f2937' }}>Getting Started</Text>
            </Box>
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <div style={{ display: "grid", gap: "14px" }}>
                  <Link url="#" removeUnderline><Text variant="bodyMd" style={{ color: '#2563eb' }}>→ How to add product options</Text></Link>
                  <Link url="#" removeUnderline><Text variant="bodyMd" style={{ color: '#2563eb' }}>→ How to install or disable the app</Text></Link>
                  <Link url="#" removeUnderline><Text variant="bodyMd" style={{ color: '#2563eb' }}>→ How to change the location of the product options</Text></Link>
                  <Link url="#" removeUnderline><Text variant="bodyMd" style={{ color: '#2563eb' }}>→ How to translate the alerts and tooltips</Text></Link>
                </div>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <div style={{ display: "grid", gap: "14px" }}>
                  <Link url="#" removeUnderline><Text variant="bodyMd" style={{ color: '#2563eb' }}>→ The app isn't showing on the product pages</Text></Link>
                  <Link url="#" removeUnderline><Text variant="bodyMd" style={{ color: '#2563eb' }}>→ The main image isn't showing correctly with variants</Text></Link>
                  <Link url="#" removeUnderline><Text variant="bodyMd" style={{ color: '#2563eb' }}>→ Add our app's data to the email notification</Text></Link>
                  <Link url="#" removeUnderline><Text variant="bodyMd" style={{ color: '#2563eb' }}>→ Add our app's data to the packing slips</Text></Link>
                </div>
              </Grid.Cell>
            </Grid>
          </Card>
        </Layout.Section>

        {/* Action Cards */}
        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 4, xl: 4 }}>
              <Card>
                <Box padding="8" style={{ textAlign: "center", minHeight: "220px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "16px" }}>
                  <Box style={{ width: "68px", height: "68px", borderRadius: "16px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#eff6ff", color: "#1d4ed8", fontSize: "32px", boxShadow: "inset 0 0 0 1px rgba(29, 78, 216, 0.1)" }}>
                    📋
                  </Box>
                  <Text as="h3" variant="headingMd" style={{ marginBottom: "0", fontWeight: "700", color: "#111827" }}>
                    Duplicate
                  </Text>
                  <Text variant="bodySm" tone="subdued" style={{ lineHeight: "1.6", maxWidth: "220px" }}>
                    Duplicate settings from one product to others efficiently
                  </Text>
                </Box>
              </Card>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 4, xl: 4 }}>
              <Card>
                <Box padding="8" style={{ textAlign: "center", minHeight: "220px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "16px" }}>
                  <Box style={{ width: "68px", height: "68px", borderRadius: "16px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f5f3ff", color: "#4338ca", fontSize: "32px", boxShadow: "inset 0 0 0 1px rgba(67, 56, 202, 0.1)" }}>
                    ⚙️
                  </Box>
                  <Text as="h3" variant="headingMd" style={{ marginBottom: "0", fontWeight: "700", color: "#111827" }}>
                    Settings
                  </Text>
                  <Text variant="bodySm" tone="subdued" style={{ lineHeight: "1.6", maxWidth: "220px" }}>
                    Change settings for how the app looks and functions
                  </Text>
                </Box>
              </Card>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 4, xl: 4 }}>
              <Card>
                <Box padding="8" style={{ textAlign: "center", minHeight: "220px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "16px" }}>
                  <Box style={{ width: "68px", height: "68px", borderRadius: "16px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#fdf2f8", color: "#db2777", fontSize: "32px", boxShadow: "inset 0 0 0 1px rgba(219, 39, 119, 0.1)" }}>
                    ❓
                  </Box>
                  <Text as="h3" variant="headingMd" style={{ marginBottom: "0", fontWeight: "700", color: "#111827" }}>
                    Help
                  </Text>
                  <Text variant="bodySm" tone="subdued" style={{ lineHeight: "1.6", maxWidth: "220px" }}>
                    Articles on how to use the app and fix common issues
                  </Text>
                </Box>
              </Card>
            </Grid.Cell>
          </Grid>
        </Layout.Section>

        {/* Upgrade Banner */}
        {showUpgradeBanner && (
          <Layout.Section>
            <Card sectioned>
              <Box style={{
                backgroundColor: "#fefce8",
                borderRadius: "10px",
                border: "1px solid #fef08a",
                padding: "14px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <Text variant="bodyMd" style={{ color: "#854d0e", fontWeight: "600", display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>⚠️</span> Upgrade to the Basic Plan to add product options to unlimited products.
                </Text>
                <button
                  onClick={() => setShowUpgradeBanner(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                    color: "#854d0e",
                    padding: "4px",
                    lineHeight: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: "0.7"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = "1"}
                  onMouseOut={(e) => e.currentTarget.style.opacity = "0.7"}
                >
                  ✕
                </button>
              </Box>
            </Card>
          </Layout.Section>
        )}

        {/* Product Stats */}
        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 4, xl: 4 }}>
              <Card>
                <Box padding="8" style={{ textAlign: "center", minHeight: "220px", borderTop: "5px solid #3b82f6", display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px", borderRadius: "0 0 8px 8px" }}>
                  <Text as="h3" variant="bodySm" style={{ marginBottom: "0", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Total Products
                  </Text>
                  <Text as="p" style={{ fontSize: "48px", fontWeight: "800", color: "#0f172a", margin: "0" }}>
                    17
                  </Text>
                </Box>
              </Card>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 4, xl: 4 }}>
              <Card>
                <Box padding="8" style={{ textAlign: "center", minHeight: "220px", borderTop: "5px solid #10b981", display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px", borderRadius: "0 0 8px 8px" }}>
                  <Text as="h3" variant="bodySm" style={{ marginBottom: "0", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    With Variants
                  </Text>
                  <Text as="p" style={{ fontSize: "48px", fontWeight: "800", color: "#0f172a", margin: "0" }}>
                    3
                  </Text>
                </Box>
              </Card>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 4, xl: 4 }}>
              <Card>
                <Box padding="8" style={{ textAlign: "center", minHeight: "220px", borderTop: "5px solid #f59e0b", display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px", borderRadius: "0 0 8px 8px" }}>
                  <Text as="h3" variant="bodySm" style={{ marginBottom: "0", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Custom Options
                  </Text>
                  <Text as="p" style={{ fontSize: "48px", fontWeight: "800", color: "#0f172a", margin: "0" }}>
                    2
                  </Text>
                </Box>
              </Card>
            </Grid.Cell>
          </Grid>
        </Layout.Section>

        {/* Add Options Section */}
        <Layout.Section>
          <Card>
            <Box padding="10" style={{
              textAlign: "center",
              display: "grid",
              gap: "24px",
              background: "linear-gradient(to bottom, #ffffff, #f8fafc)",
              borderRadius: "12px",
              padding: "15px 15px"
            }}>
              <Text as="h3" variant="headingLg" style={{ margin: "0", fontWeight: "800", color: "#111827" }}>
                Add options to a single product:
              </Text>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  onClick={handleOpenProductModal}
                  style={{
                    minWidth: "180px",
                    height: "48px",
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    borderColor: "#000000",
                    padding: "0 32px",
                    fontWeight: "700",
                    fontSize: "16px",
                    borderRadius: "10px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                  }}
                >
                  Choose Product
                </Button>
              </div>
              <Text variant="bodyMd" tone="subdued" style={{ margin: "0 auto", maxWidth: "520px", lineHeight: "1.6" }}>
                App settings will not be visible on grayed out products below. <Link url="#">Click here to upgrade the plan</Link>
              </Text>
            </Box>
          </Card>
        </Layout.Section>

        <Modal
          open={isProductModalOpen}
          onClose={handleCloseProductModal}
          title="Choose Product"
          large
        >
          <Modal.Section>
            {isLoadingProducts ? (
              <Box padding="10" style={{ textAlign: "center" }}>
                <Text variant="bodyLg">Loading products...</Text>
              </Box>
            ) : productModalError ? (
              <Text as="p" color="critical">{productModalError}</Text>
            ) : products.length === 0 ? (
              <Text as="p">No products found.</Text>
            ) : (
              <Box style={{ maxHeight: "450px", overflowY: "auto", padding: '4px' }}>
                <Box style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
                  {products.map((product, index) => (
                    <Box
                      key={product.id}
                      onClick={() => handleProductSelection(product.id)}
                      style={{
                        cursor: "pointer",
                        borderBottom: index < products.length - 1 ? "1px solid #f1f5f9" : "none",
                        backgroundColor: selectedProductId === product.id ? "#eff6ff" : "#ffffff",
                        transition: "all 0.2s ease",
                        padding: "16px 20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <input
                        type="radio"
                        name="productSelection"
                        checked={selectedProductId === product.id}
                        readOnly
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                          accentColor: "#000000"
                        }}
                      />
                      <Box style={{ flex: 1, display: "flex", alignItems: "center", gap: "16px" }}>
                        {product.featuredImage ? (
                          <img
                            src={product.featuredImage.url}
                            alt={product.title}
                            style={{
                              width: "56px",
                              height: "56px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border: "1px solid #e2e8f0",
                            }}
                          />
                        ) : (
                          <Box
                            style={{
                              width: "56px",
                              height: "56px",
                              backgroundColor: "#f1f5f9",
                              borderRadius: "8px",
                              border: "1px solid #e2e8f0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text variant="bodySm" tone="subdued">No Image</Text>
                          </Box>
                        )}
                        <Box style={{ flex: 1 }}>
                          <Text as="h3" variant="bodyMd" style={{ fontWeight: "600", color: "#111827", margin: "0 0 4px 0" }}>
                            {product.title}
                          </Text>
                          <Text variant="bodySm" tone="subdued">
                            {product.handle}
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Modal.Section>
          <Modal.Section>
            <Box style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <Button onClick={handleCloseProductModal}>Cancel</Button>
              <Button
                primary
                onClick={handleContinue}
                disabled={!selectedProductId}
                style={{ backgroundColor: selectedProductId ? '#000000' : '#f1f1f1', borderColor: selectedProductId ? '#000000' : '#f1f1f1' }}
              >
                Continue
              </Button>
            </Box>
          </Modal.Section>
        </Modal>

        {/* Recently Saved Products */}
        <Layout.Section>
          <Card>
            <Box padding="8">
              <Text as="h3" variant="headingMd" style={{ marginBottom: "12px", fontWeight: "700", color: "#111827" }}>
                Recently Saved Products
              </Text>
              <Text variant="bodySm" tone="subdued" style={{ marginBottom: "24px", lineHeight: "1.6" }}>
                *App settings will not be visible on grayed out products below. <Link url="#">Click here to upgrade the plan for unlimited products.</Link>
              </Text>
              <Box style={{ overflowX: "auto", border: '1px solid #f1f5f9', borderRadius: '8px' }}>
                <table style={{ width: "100%", minWidth: "560px", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f8fafc" }}>
                      <th style={{ textAlign: "left", padding: "16px 20px", fontWeight: "700", color: "#475569", fontSize: "13px", textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: "1px solid #e2e8f0" }}>
                        Product Title
                      </th>
                      <th style={{ textAlign: "left", padding: "16px 20px", fontWeight: "700", color: "#475569", fontSize: "13px", textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: "1px solid #e2e8f0" }}>
                        URL Handle
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "16px 20px" }}>
                        <Link url="#" removeUnderline><Text variant="bodyMd" style={{ fontWeight: '500', color: '#2563eb' }}>The Collection Snowboard: Hydrogen</Text></Link>
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <Text variant="bodySm" style={{ color: '#64748b', fontFamily: 'monospace', backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>the-collection-snowboard-hydrogen</Text>
                      </td>
                    </tr>
                    <tr style={{ backgroundColor: "#fcfcfd", borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "16px 20px" }}>
                        <Link url="#" removeUnderline><Text variant="bodyMd" style={{ fontWeight: '500', color: '#2563eb' }}>The Collection Snowboard: Liquid</Text></Link>
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <Text variant="bodySm" style={{ color: '#64748b', fontFamily: 'monospace', backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>the-collection-snowboard-liquid</Text>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Box>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}