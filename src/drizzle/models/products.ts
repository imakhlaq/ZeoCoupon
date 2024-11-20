import { subscriptionTiers, TierNames } from "@/config/subscription";
import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uuid,
  index,
  boolean,
  real,
  primaryKey,
  pgEnum,
} from "drizzle-orm/pg-core";

const createdAt = timestamp("created_at", { withTimezone: true })
  .notNull()
  .defaultNow();
const updatedAt = timestamp("updated_at", { withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date()); //function will be called when this table will be updated (i.e life cycle method)

export const productTable = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    authId: text("auth_id").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    url: text("url").notNull(),
    createdAt,
    updatedAt,
  },
  //setting up the index on the authId because our queries will be based on the authId
  (table) => [index("auth_index").on(table.authId)]
);

//this is for bi-directional iteration
export const productRelation = relations(productTable, ({ one, many }) => ({
  productCustomization: one(productCustomizationTable),
  productViewTable: many(productViewTable),
  countryGroupDiscounts: many(countryGroupDisTable),
}));

export const productCustomizationTable = pgTable("product_customizations", {
  id: uuid("id").primaryKey().defaultRandom(),
  classPrefix: text("class_prefix"),
  productId: uuid("product_id")
    .notNull()
    .references(() => productTable.id, { onDelete: "cascade" })
    .unique(),
  locationMessage: text("location_message")
    .notNull()
    .default(
      "Hey! Its looks like you are from <b>{country}</b>. We support Parity Purchasing Power, so if you need it, use code <b>'{coupon}'</b> to get <b>{discount}%</b> off."
    ),
  backgroundColor: text("background_color")
    .notNull()
    .default("hls(193,82%,31%)"),
  textColor: text("text_color").notNull().default("hls(0,0%,100%)"),
  fontSize: text("font_size").notNull().default("1rem"),
  bannerContainer: text("banner_container").notNull().default("body"),
  isSticky: boolean("is_sticky").notNull().default(true),
  createdAt,
  updatedAt,
});

export const productCustomizationRelation = relations(
  productCustomizationTable,
  ({ one, many }) => ({
    product: one(productTable, {
      //the table that contain the foreigh key we need to add this
      //which key of productCustomizationTable is foreign key and which colum of the foreign table its refreing to
      fields: [productCustomizationTable.productId],
      references: [productTable.id],
    }),
  })
);
export const productViewTable = pgTable("product_view", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .notNull()
    .references(() => productTable.id, { onDelete: "cascade" }),
  countryId: uuid("country_id").references(() => countryTable.id, {
    onDelete: "cascade",
  }),
  visitedAt: timestamp("visited_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const productViewRelations = relations(productViewTable, ({ one }) => ({
  // a view belong to one product table
  product: one(productTable, {
    fields: [productViewTable.productId],
    references: [productTable.id],
  }),
  // a view is from one country
  country: one(countryTable, {
    fields: [productViewTable.countryId],
    references: [countryTable.id],
  }),
}));

export const countryTable = pgTable("countries", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  code: text("code").notNull().unique(),
  countryGroupId: uuid("country_group_id")
    .notNull()
    .references(() => countryGroupTable.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});

export const countryRelation = relations(countryTable, ({ one, many }) => ({
  //one country belongs to one country group
  countryGroups: one(countryGroupTable, {
    fields: [countryTable.countryGroupId],
    references: [countryGroupTable.id],
  }),
  //a product can have many views from same country
  productViews: many(productViewTable),
}));

export const countryGroupTable = pgTable("country_groups", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  recommandedDisPer: real("recommanded_discount_percentage"),
  createdAt,
  updatedAt,
});

export const countryGroupRelations = relations(
  countryGroupTable,
  ({ many }) => ({
    countries: many(countryTable),
    countryGroupDiscounts: many(countryGroupDisTable),
  })
);

export const countryGroupDisTable = pgTable(
  "country_group_discounts",
  {
    countryGroupId: uuid("country_group_id")
      .notNull()
      .references(() => countryGroupTable.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
      .notNull()
      .references(() => productTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
  },
  //setting up the index on the authId because our queries will be based on the authId
  (table) => [
    //defing composite key
    { pk: primaryKey({ columns: [table.countryGroupId, table.productId] }) },
  ]
);

export const TierEnum = pgEnum(
  "tier",
  Object.keys(subscriptionTiers) as [TierNames]
);

export const userSubscriptonTable = pgTable(
  "user_subscription",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    authUserId: text("clerk_user_id").notNull().unique(),
    stripeSubscriptionItemId: text("stripe_subscription_item_id"),
    stripeSubscriptionId: text("stripe_subscription_id"),
    stripeCustomerId: text("stripe_customer_id"),
    tier: TierEnum("tier").notNull(),
    createdAt,
    updatedAt,
  },
  (table) => [
    {
      authUserIndex: index("user_subscription.clerk_user_id_index").on(
        table.authUserId
      ),
      stripeCustomerIdIndex: index(
        "user_subscription.stripe_customer_id_index"
      ).on(table.stripeCustomerId),
    },
  ]
);
