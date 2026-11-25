CREATE TABLE `actions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`code` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`is_active` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `actions_id` PRIMARY KEY(`id`),
	CONSTRAINT `actions_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `assessments` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`diet_category_id` bigint unsigned NOT NULL,
	`age` smallint unsigned NOT NULL,
	`gender` enum('male','female') NOT NULL,
	`height_cm` decimal unsigned NOT NULL,
	`current_weight_kg` decimal unsigned NOT NULL,
	`target_weight_kg` decimal unsigned NOT NULL,
	`status` enum('in_progress','completed','inconclusive','cancelled') NOT NULL DEFAULT 'in_progress',
	`started_at` timestamp NOT NULL DEFAULT (now()),
	`completed_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `assessments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `assessments_facts` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`assessment_id` bigint unsigned NOT NULL,
	`fact_definition_id` bigint unsigned NOT NULL,
	`value` boolean NOT NULL,
	`answered_at` timestamp NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `assessments_facts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `diet_categories` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`code` varchar(255) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`is_active` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `diet_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `diet_categories_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `fact_definitions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`code` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`question_text` text NOT NULL,
	`is_active` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `fact_definitions_id` PRIMARY KEY(`id`),
	CONSTRAINT `fact_definitions_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `goals` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`diet_category_id` bigint unsigned NOT NULL,
	`code` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`is_active` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `goals_id` PRIMARY KEY(`id`),
	CONSTRAINT `goals_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `interface_logs` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`assessment_id` bigint unsigned NOT NULL,
	`event_type` varchar(100) NOT NULL,
	`message` text,
	`metadata` json,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `interface_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `recommendation_result_actions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`result_id` bigint unsigned NOT NULL,
	`action_id` bigint unsigned NOT NULL,
	`sort_order` int NOT NULL DEFAULT 1,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `recommendation_result_actions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `recommendation_results` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`assessment_id` bigint unsigned NOT NULL,
	`goal_id` bigint unsigned NOT NULL,
	`matched_rule_id` bigint unsigned,
	`status` enum('confirmed','not_confirmed','inconclusive') NOT NULL,
	`explanation` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `recommendation_results_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rule_actions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`rule_id` bigint unsigned NOT NULL,
	`action_id` bigint unsigned NOT NULL,
	`sort_order` int NOT NULL DEFAULT 1,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `rule_actions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rule_condition_groups` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`rule_id` bigint unsigned NOT NULL,
	`group_order` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `rule_condition_groups_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rule_conditions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`rule_group_id` bigint unsigned NOT NULL,
	`fact_definition_id` bigint unsigned NOT NULL,
	`expected_value` boolean NOT NULL,
	`sort_order` int NOT NULL DEFAULT 1,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `rule_conditions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rules` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`goal_id` bigint unsigned NOT NULL,
	`code` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`priority` int NOT NULL DEFAULT 0,
	`description` text NOT NULL,
	`is_active` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `rules_id` PRIMARY KEY(`id`),
	CONSTRAINT `rules_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `assessments` ADD CONSTRAINT `assessments_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `assessments` ADD CONSTRAINT `assessments_diet_category_id_diet_categories_id_fk` FOREIGN KEY (`diet_category_id`) REFERENCES `diet_categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `assessments_facts` ADD CONSTRAINT `assessments_facts_assessment_id_assessments_id_fk` FOREIGN KEY (`assessment_id`) REFERENCES `assessments`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `assessments_facts` ADD CONSTRAINT `assessments_facts_fact_definition_id_fact_definitions_id_fk` FOREIGN KEY (`fact_definition_id`) REFERENCES `fact_definitions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `goals` ADD CONSTRAINT `goals_diet_category_id_diet_categories_id_fk` FOREIGN KEY (`diet_category_id`) REFERENCES `diet_categories`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `interface_logs` ADD CONSTRAINT `interface_logs_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `interface_logs` ADD CONSTRAINT `interface_logs_assessment_id_assessments_id_fk` FOREIGN KEY (`assessment_id`) REFERENCES `assessments`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recommendation_result_actions` ADD CONSTRAINT `recommendation_result_actions_result_id_recommendation_results_id_fk` FOREIGN KEY (`result_id`) REFERENCES `recommendation_results`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recommendation_result_actions` ADD CONSTRAINT `recommendation_result_actions_action_id_actions_id_fk` FOREIGN KEY (`action_id`) REFERENCES `actions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recommendation_results` ADD CONSTRAINT `recommendation_results_assessment_id_assessments_id_fk` FOREIGN KEY (`assessment_id`) REFERENCES `assessments`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recommendation_results` ADD CONSTRAINT `recommendation_results_goal_id_goals_id_fk` FOREIGN KEY (`goal_id`) REFERENCES `goals`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recommendation_results` ADD CONSTRAINT `recommendation_results_matched_rule_id_rules_id_fk` FOREIGN KEY (`matched_rule_id`) REFERENCES `rules`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rule_actions` ADD CONSTRAINT `rule_actions_rule_id_rules_id_fk` FOREIGN KEY (`rule_id`) REFERENCES `rules`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rule_actions` ADD CONSTRAINT `rule_actions_action_id_actions_id_fk` FOREIGN KEY (`action_id`) REFERENCES `actions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rule_condition_groups` ADD CONSTRAINT `rule_condition_groups_rule_id_rules_id_fk` FOREIGN KEY (`rule_id`) REFERENCES `rules`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rule_conditions` ADD CONSTRAINT `rule_conditions_rule_group_id_rule_condition_groups_id_fk` FOREIGN KEY (`rule_group_id`) REFERENCES `rule_condition_groups`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rule_conditions` ADD CONSTRAINT `rule_conditions_fact_definition_id_fact_definitions_id_fk` FOREIGN KEY (`fact_definition_id`) REFERENCES `fact_definitions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rules` ADD CONSTRAINT `rules_goal_id_goals_id_fk` FOREIGN KEY (`goal_id`) REFERENCES `goals`(`id`) ON DELETE no action ON UPDATE no action;