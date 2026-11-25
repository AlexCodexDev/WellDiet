import { bigint, boolean, decimal, int, json, mysqlEnum, mysqlTable, smallint, text, timestamp, varchar } from "drizzle-orm/mysql-core";

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
    age: smallint("age", { unsigned: true }).notNull(),
    gender: mysqlEnum("gender", [
        "male",
        "female"
    ]).notNull(),
    heightCm: decimal("height_cm", { mode: "number", unsigned: true }).notNull(),
    currentWeightKg: decimal("current_weight_kg", { mode: "number", unsigned: true }).notNull(),
    targetWeightKg: decimal("target_weight_kg", { mode: "number", unsigned: true }).notNull(),
    status: mysqlEnum("status", [
        "in_progress",
        "completed",
        "inconclusive",
        "cancelled" 
    ]).default("in_progress").notNull(),
    startedAt: timestamp("started_at").defaultNow().notNull(),
    completedAt: timestamp("completed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});

export const fact_definitions = mysqlTable("fact_definitions", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    code: varchar("code", { length: 255 }).unique().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    questionText: text("question_text").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});

export const assessments_facts = mysqlTable("assessments_facts", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    assessmentId: bigint("assessment_id", { mode: "number", unsigned: true }).notNull().references(() => assessments.id),
    factDefinitionId: bigint("fact_definition_id", { mode: "number", unsigned: true }).notNull().references(() => fact_definitions.id),
    value: boolean('value').notNull(),
    answeredAt: timestamp("answered_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});

export const goals = mysqlTable("goals", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    dietCategoryId: bigint("diet_category_id", { mode: "number", unsigned: true }).references(() => diet_categories.id, { onDelete: "restrict" }).notNull(),
    code: varchar("code", { length: 255 }).unique().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});

export const rules = mysqlTable("rules", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    goalId: bigint("goal_id", { mode: "number", unsigned: true }).notNull().references(() => goals.id),
    code: varchar("code", { length: 255 }).unique().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    priority: int("priority").default(0).notNull(),
    description: text("description").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});

export const rule_condition_groups = mysqlTable("rule_condition_groups", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    ruleId: bigint("rule_id", { mode: "number", unsigned: true }).references(() => rules.id, { onDelete: "cascade" }).notNull(),
    groupOrder: int("group_order").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});

export const rule_conditions = mysqlTable("rule_conditions", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    ruleGroupId: bigint("rule_group_id", { mode: "number", unsigned: true }).notNull().references(() => rule_condition_groups.id),
    factDefinitionId: bigint("fact_definition_id", { mode: "number", unsigned: true }).notNull().references(() => fact_definitions.id),
    expectedValue: boolean("expected_value").notNull(),
    sortOrder: int("sort_order").default(1).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});

export const actions = mysqlTable("actions", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    code: varchar("code", { length: 255 }).unique().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});

export const rule_actions = mysqlTable("rule_actions", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    ruleId: bigint("rule_id", { mode: "number", unsigned: true }).notNull().references(() => rules.id),
    actionId: bigint("action_id", { mode: "number", unsigned: true }).notNull().references(() => actions.id),
    sortOrder: int("sort_order").default(1).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});

export const interface_logs = mysqlTable("interface_logs", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    userId: bigint("user_id", { mode: "number", unsigned: true }).notNull().references(() => users.id),
    assessmentId: bigint("assessment_id", { mode: "number", unsigned: true }).notNull().references(() => assessments.id),
    eventType: varchar("event_type", { length: 100 }).notNull(),
    message: text("message"),
    metadata: json("metadata"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});

export const recommendation_results = mysqlTable("recommendation_results", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    assessmentId: bigint("assessment_id", { mode: "number", unsigned: true }).notNull().references(() => assessments.id),
    goalId: bigint("goal_id", { mode: "number", unsigned: true }).notNull().references(() => goals.id),
    matchedRuleId: bigint("matched_rule_id", { mode: "number", unsigned: true }).references(() => rules.id, { onDelete: "restrict" }),
    status: mysqlEnum("status", [
        "confirmed",
        "not_confirmed",
        "inconclusive"
    ]).notNull(),
    explanation: text("explanation"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});

export const recommendation_result_actions = mysqlTable("recommendation_result_actions", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    resultId: bigint("result_id", { mode: "number", unsigned: true }).notNull().references(() => recommendation_results.id),
    actionId: bigint("action_id", { mode: "number", unsigned: true }).notNull().references(() => actions.id),
    sortOrder: int("sort_order").default(1).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});

export const diet_categories = mysqlTable("diet_categories", {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    code: varchar("code", { length: 255 }).unique().notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at")
});