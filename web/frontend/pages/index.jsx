import React from 'react';
import {
  Page,
  Layout,
  Card,
  Text,
  Link,
  Button,
  Box,
  Grid,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function HomePage() {
  return (
    <Page>
      <TitleBar title="Variance App" />
      <Layout>
        {/* Getting Started Section */}
        <Layout.Section>
          <Card title="Getting Started" sectioned>
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <div style={{ display: "grid", gap: "12px" }}>
                  <Link url="#">How to add product options</Link>
                  <Link url="#">How to install or disable the app</Link>
                  <Link url="#">How to change the location of the product options</Link>
                  <Link url="#">How to translate the alerts and tooltips</Link>
                </div>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <div style={{ display: "grid", gap: "12px" }}>
                  <Link url="#">The app isn't showing on the product pages</Link>
                  <Link url="#">The main image isn't showing correctly with variants</Link>
                  <Link url="#">Add our app's data to the email notification</Link>
                  <Link url="#">Add our app's data to the packing slips</Link>
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
                <Box padding="6" style={{ textAlign: "center", minHeight: "210px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "18px" }}>
                  <Box style={{ width: "72px", height: "72px", borderRadius: "18px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#eff6ff", color: "#1d4ed8", fontSize: "34px" }}>
                    📋
                  </Box>
                  <Text as="h3" variant="headingMd" style={{ marginBottom: "0", fontWeight: "700", color: "#1f2937" }}>
                    Duplicate
                  </Text>
                  <Text variant="bodySm" tone="subdued" style={{ lineHeight: "1.8", maxWidth: "240px" }}>
                    Duplicate settings from one product to others
                  </Text>
                </Box>
              </Card>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 4, xl: 4 }}>
              <Card>
                <Box padding="6" style={{ textAlign: "center", minHeight: "210px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "18px" }}>
                  <Box style={{ width: "72px", height: "72px", borderRadius: "18px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#eef2ff", color: "#4338ca", fontSize: "34px" }}>
                    ⚙️
                  </Box>
                  <Text as="h3" variant="headingMd" style={{ marginBottom: "0", fontWeight: "700", color: "#1f2937" }}>
                    Settings
                  </Text>
                  <Text variant="bodySm" tone="subdued" style={{ lineHeight: "1.8", maxWidth: "240px" }}>
                    Change settings for how the app looks and functions
                  </Text>
                </Box>
              </Card>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 4, xl: 4 }}>
              <Card>
                <Box padding="6" style={{ textAlign: "center", minHeight: "210px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "18px" }}>
                  <Box style={{ width: "72px", height: "72px", borderRadius: "18px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#eff6ff", color: "#1d4ed8", fontSize: "34px" }}>
                    ❓
                  </Box>
                  <Text as="h3" variant="headingMd" style={{ marginBottom: "0", fontWeight: "700", color: "#1f2937" }}>
                    Help
                  </Text>
                  <Text variant="bodySm" tone="subdued" style={{ lineHeight: "1.8", maxWidth: "240px" }}>
                    Articles on how to use the app and fix common issues
                  </Text>
                </Box>
              </Card>
            </Grid.Cell>
          </Grid>
        </Layout.Section>

        {/* Upgrade Banner */}
        <Layout.Section>
          <Card sectioned>
            <Box style={{ backgroundColor: "#eef2ff", borderRadius: "12px", border: "1px solid #bfdbfe", padding: "16px" }}>
              <Text variant="bodySm" style={{ color: "#1e40af", fontWeight: "600" }}>
                ⚠️ Upgrade to the Basic Plan to add product options to unlimited products.
              </Text>
            </Box>
          </Card>
        </Layout.Section>

        {/* Product Stats */}
        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 4, xl: 4}}>
              <Card>
                <Box padding="8" style={{ textAlign: "center", minHeight: "240px", borderTop: "4px solid #3b82f6", display: "flex", flexDirection: "column", justifyContent: "center", gap: "12px" }}>
                  <Text as="h3" variant="bodySm" style={{ marginBottom: "0", fontWeight: "600", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Total Products
                  </Text>
                  <Text as="p" style={{ fontSize: "44px", fontWeight: "700", color: "#1f2937", margin: "0" }}>
                    17
                  </Text>
                </Box>
              </Card>
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 4, xl: 4}}>
              <Card>
                <Box padding="8" style={{ textAlign: "center", minHeight: "240px", borderTop: "4px solid #10b981", display: "flex", flexDirection: "column", justifyContent: "center", gap: "12px" }}>
                  <Text as="h3" variant="bodySm" style={{ marginBottom: "0", fontWeight: "600", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Products with Variants
                  </Text>
                  <Text as="p" style={{ fontSize: "44px", fontWeight: "700", color: "#1f2937", margin: "0" }}>
                    3
                  </Text>
                </Box>
              </Card>
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 4, xl: 4}}>
              <Card>
                <Box padding="8" style={{ textAlign: "center", minHeight: "240px", borderTop: "4px solid #f59e0b", display: "flex", flexDirection: "column", justifyContent: "center", gap: "12px" }}>
                  <Text as="h3" variant="bodySm" style={{ marginBottom: "0", fontWeight: "600", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Products with Custom Options
                  </Text>
                  <Text as="p" style={{ fontSize: "44px", fontWeight: "700", color: "#1f2937", margin: "0" }}>
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
            <Box padding="8" style={{ textAlign: "center", display: "grid", gap: "18px" }}>
              <Text as="h3" variant="headingMd" style={{ margin: "0", padding: "12px 0", fontWeight: "700", color: "#1f2937" }}>
                Add options to a single product:
              </Text>
              <Button primary style={{ minWidth: "180px", backgroundColor: "#111827", borderColor: "#111827", padding: "0 24px" }}>
                Choose Product
              </Button>
              <Text variant="bodySm" tone="subdued" style={{ margin: "0 auto", maxWidth: "520px", lineHeight: "1.6", padding: "8px 0" }}>
                App settings will not be visible on grayed out products below. <Link url="#">Click here to upgrade the plan</Link>
              </Text>
            </Box>
          </Card>
        </Layout.Section>

        {/* Recently Saved Products */}
        <Layout.Section>
          <Card>
            <Box padding="6">
              <Text as="h3" variant="headingMd" style={{ marginBottom: "10px", fontWeight: "700", color: "#1f2937" }}>
                Recently Saved Products
              </Text>
              <Text variant="bodySm" tone="subdued" style={{ marginBottom: "20px", lineHeight: "1.6" }}>
                *App settings will not be visible on grayed out products below. <Link url="#">Click here to upgrade the plan for unlimited products.</Link>
              </Text>
              <Box style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", minWidth: "560px", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f9fafb" }}>
                      <th style={{ textAlign: "left", padding: "14px 12px", fontWeight: "700", color: "#1f2937", fontSize: "14px", borderBottom: "1px solid #e5e7eb" }}>
                        Title
                      </th>
                      <th style={{ textAlign: "left", padding: "14px 12px", fontWeight: "700", color: "#1f2937", fontSize: "14px", borderBottom: "1px solid #e5e7eb" }}>
                        Handle
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "14px 12px" }}>
                        <Link url="#">The Collection Snowboard: Hydrogen</Link>
                      </td>
                      <td style={{ padding: "14px 12px" }}>
                        <Text variant="bodySm">the-collection-snowboard-hydrogen</Text>
                      </td>
                    </tr>
                    <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "14px 12px" }}>
                        <Link url="#">The Collection Snowboard: Liquid</Link>
                      </td>
                      <td style={{ padding: "14px 12px" }}>
                        <Text variant="bodySm">the-collection-snowboard-liquid</Text>
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