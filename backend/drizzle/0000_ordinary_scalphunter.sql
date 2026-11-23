CREATE TABLE `actions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`code` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`category` varchar(255) NOT NULL,
	`description` text,
	`content` json,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `actions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `assessments` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`diet_category_id` bigint unsigned NOT NULL,
	`age` int,
	`gender` enum('male','female') DEFAULT 'male',
	`height` decimal unsigned,
	`weight` decimal unsigned,
	`target_weight` decimal unsigned,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `assessments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `assessments_facts` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`assessment_id` bigint unsigned NOT NULL,
	`fact_assessment_id` bigint unsigned NOT NULL,
	`value` varchar(255) NOT NULL,
	`source` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `assessments_facts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `category` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`code` varchar(255) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `category_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fact_definitions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`code` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`data_type` varchar(255) NOT NULL,
	`unit` varchar(255) NOT NULL,
	`description` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `fact_definitions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `goals` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`code` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `goals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `interface_logs` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`assessment_id` bigint unsigned NOT NULL,
	`rule_id` bigint unsigned NOT NULL,
	`status` varchar(255),
	`explanation` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `interface_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `recommendation_result_actions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`result_id` bigint unsigned NOT NULL,
	`goal_id` bigint unsigned NOT NULL,
	`action_snapshot` json,
	`sequence` int,
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
	`diet_category_id` bigint unsigned NOT NULL,
	`matched_rule_id` bigint unsigned NOT NULL,
	`summary` text,
	`result_data` json,
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
	`sequence` int,
	`parameter` json,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `rule_actions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rule_conditions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`fact_definition_id` bigint unsigned NOT NULL,
	`rule_id` bigint unsigned NOT NULL,
	`operator` varchar(255) NOT NULL,
	`value` varchar(255) NOT NULL,
	`priority` varchar(255) NOT NULL,
	`group_no` int,
	`sequence` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `rule_conditions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rules` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`goalId` bigint unsigned NOT NULL,
	`diet_category_id` bigint unsigned NOT NULL,
	`code` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`priority` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`is_active` boolean NOT NULL DEFAULT true,
	`version` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `rules_id` PRIMARY KEY(`id`)
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
ALTER TABLE `assessments` ADD CONSTRAINT `assessments_diet_category_id_category_id_fk` FOREIGN KEY (`diet_category_id`) REFERENCES `category`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `assessments_facts` ADD CONSTRAINT `assessments_facts_assessment_id_assessments_id_fk` FOREIGN KEY (`assessment_id`) REFERENCES `assessments`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `assessments_facts` ADD CONSTRAINT `assessments_facts_fact_assessment_id_fact_definitions_id_fk` FOREIGN KEY (`fact_assessment_id`) REFERENCES `fact_definitions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `interface_logs` ADD CONSTRAINT `interface_logs_assessment_id_assessments_id_fk` FOREIGN KEY (`assessment_id`) REFERENCES `assessments`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `interface_logs` ADD CONSTRAINT `interface_logs_rule_id_rules_id_fk` FOREIGN KEY (`rule_id`) REFERENCES `rules`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recommendation_result_actions` ADD CONSTRAINT `recommendation_result_actions_result_id_recommendation_results_id_fk` FOREIGN KEY (`result_id`) REFERENCES `recommendation_results`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recommendation_result_actions` ADD CONSTRAINT `recommendation_result_actions_goal_id_actions_id_fk` FOREIGN KEY (`goal_id`) REFERENCES `actions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recommendation_results` ADD CONSTRAINT `recommendation_results_assessment_id_assessments_id_fk` FOREIGN KEY (`assessment_id`) REFERENCES `assessments`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recommendation_results` ADD CONSTRAINT `recommendation_results_goal_id_goals_id_fk` FOREIGN KEY (`goal_id`) REFERENCES `goals`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recommendation_results` ADD CONSTRAINT `recommendation_results_diet_category_id_category_id_fk` FOREIGN KEY (`diet_category_id`) REFERENCES `category`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recommendation_results` ADD CONSTRAINT `recommendation_results_matched_rule_id_rules_id_fk` FOREIGN KEY (`matched_rule_id`) REFERENCES `rules`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rule_actions` ADD CONSTRAINT `rule_actions_rule_id_rules_id_fk` FOREIGN KEY (`rule_id`) REFERENCES `rules`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rule_actions` ADD CONSTRAINT `rule_actions_action_id_actions_id_fk` FOREIGN KEY (`action_id`) REFERENCES `actions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rule_conditions` ADD CONSTRAINT `rule_conditions_fact_definition_id_fact_definitions_id_fk` FOREIGN KEY (`fact_definition_id`) REFERENCES `fact_definitions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rule_conditions` ADD CONSTRAINT `rule_conditions_rule_id_rules_id_fk` FOREIGN KEY (`rule_id`) REFERENCES `rules`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rules` ADD CONSTRAINT `rules_goalId_goals_id_fk` FOREIGN KEY (`goalId`) REFERENCES `goals`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rules` ADD CONSTRAINT `rules_diet_category_id_category_id_fk` FOREIGN KEY (`diet_category_id`) REFERENCES `category`(`id`) ON DELETE no action ON UPDATE no action;