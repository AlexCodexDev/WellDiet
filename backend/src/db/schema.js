import { bigint, boolean, decimal, int, json, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    username: varchar("username", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});

export const assessments = mysqlTable("assessments", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    userId: bigint("user_id", { mode: "number", unsigned: true }).notNull().references(() => users.id),
    dietCategoryId: bigint("diet_category_id", { mode: "number", unsigned: true }).notNull().references(() => diet_categories.id),
    age: int("age"),
    gender: mysqlEnum("gender", [
        "male",
        "female"
    ]).default("male"),
    height: decimal("height", { mode: "number", unsigned: true }),
    weight: decimal("weight", { mode: "number", unsigned: true }),
    target_weight: decimal("target_weight", { mode: "number", unsigned: true }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});

export const fact_definitions = mysqlTable("fact_definitions", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    code: varchar("code", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    dataType: varchar("data_type", { length: 255 }).notNull(),
    unit: varchar("unit", { length: 255 }).notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});

export const assessments_facts = mysqlTable("assessments_facts", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    assessmentId: bigint("assessment_id", { mode: "number", unsigned: true }).notNull().references(() => assessments.id),
    factDefinitionId: bigint("fact_definition_id", { mode: "number", unsigned: true }).notNull().references(() => fact_definitions.id),
    value: varchar("value", { length: 255 }).notNull(),
    source: varchar("source", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});

export const goals = mysqlTable("goals", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    code: varchar("code", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});

export const rules = mysqlTable("rules", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    goalId: bigint("goal_id", { mode: "number", unsigned: true }).notNull().references(() => goals.id),
    dietCategoryId: bigint("diet_category_id", { mode: "number", unsigned: true }).notNull().references(() => diet_categories.id),
    code: varchar("code", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    priority: varchar("priority", { length: 255 }).notNull(),
    description: text("description").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    version: int("version"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});

export const rule_conditions = mysqlTable("rule_conditions", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    factDefinitionId: bigint("fact_definition_id", { mode: "number", unsigned: true }).notNull().references(() => fact_definitions.id),
    ruleId: bigint("rule_id", { mode: "number", unsigned: true }).notNull().references(() => rules.id),
    operator: varchar("operator", { length: 255 }).notNull(),
    value: varchar("value", { length: 255 }).notNull(),
    priority: varchar("priority", { length: 255 }).notNull(),
    groupNo: int("group_no"),
    sequence: int("sequence"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});

export const actions = mysqlTable("actions", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    code: varchar("code", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    category: varchar("category", { length: 255 }).notNull(),
    description: text("description"),
    content: json("content"),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});

export const rule_actions = mysqlTable("rule_actions", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    ruleId: bigint("rule_id", { mode: "number", unsigned: true }).notNull().references(() => rules.id),
    actionId: bigint("action_id", { mode: "number", unsigned: true }).notNull().references(() => actions.id),
    sequence: int("sequence"),
    parameter: json("parameter"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});

export const interface_logs = mysqlTable("interface_logs", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    assessmentId: bigint("assessment_id", { mode: "number", unsigned: true }).notNull().references(() => assessments.id),
    ruleId: bigint("rule_id", { mode: "number", unsigned: true }).notNull().references(() => rules.id),
    status: varchar("status", { length: 255 }),
    explanation: text("explanation"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});

export const recommendation_results = mysqlTable("recommendation_results", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    assessmentId: bigint("assessment_id", { mode: "number", unsigned: true }).notNull().references(() => assessments.id),
    goalId: bigint("goal_id", { mode: "number", unsigned: true }).notNull().references(() => goals.id),
    dietCategoryId: bigint("diet_category_id", { mode: "number", unsigned: true }).notNull().references(() => diet_categories.id),
    matchedRuleId: bigint("matched_rule_id", { mode: "number", unsigned: true }).notNull().references(() => rules.id),
    summary: text("summary"),
    result_data: json("result_data"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});

export const recommendation_result_actions = mysqlTable("recommendation_result_actions", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    resultId: bigint("result_id", { mode: "number", unsigned: true }).notNull().references(() => recommendation_results.id),
    actionId: bigint("action_id", { mode: "number", unsigned: true }).notNull().references(() => actions.id),
    actionSnapshot: json("action_snapshot"),
    sequence: int("sequence"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});

export const diet_categories = mysqlTable("diet_categories", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    code: varchar("code", { length: 255 }).notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});