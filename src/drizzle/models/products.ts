import {
  pgTable,
  text,
  timestamp,
  uuid,
  index,
  boolean,
} from "drizzle-orm/pg-core";

const createdAt = timestamp("created_at", { withTimezone: true })
  .notNull()
  .defaultNow();
const updatedAt = timestamp("updated_at", { withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date()); //function will be called when this table will be updated (i.e life cycle method)

export const ProductTable = pgTable(
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

export const ProductCustomizationTable = pgTable("product_customizations", {
  id: uuid("id").primaryKey().defaultRandom(),
  classPrefix: text("class_prefix"),
  productId: uuid("product_id")
    .notNull()
    .references(() => ProductTable.id, { onDelete: "cascade" }),
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
