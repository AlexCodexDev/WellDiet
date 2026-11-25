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
ALTER TABLE `assessments` RENAME COLUMN `height` TO `height_cm`;--> statement-breakpoint
ALTER TABLE `assessments` RENAME COLUMN `weight` TO `current_weight_kg`;--> statement-breakpoint
ALTER TABLE `assessments` RENAME COLUMN `target_weight` TO `target_weight_kg`;--> statement-breakpoint
ALTER TABLE `interface_logs` RENAME COLUMN `explanation` TO `event_type`;--> statement-breakpoint
ALTER TABLE `recommendation_result_actions` RENAME COLUMN `sequence` TO `sort_order`;--> statement-breakpoint
ALTER TABLE `interface_logs` DROP FOREIGN KEY `interface_logs_rule_id_rules_id_fk`;
--> statement-breakpoint
ALTER TABLE `recommendation_results` DROP FOREIGN KEY `recommendation_results_diet_category_id_diet_categories_id_fk`;
--> statement-breakpoint
ALTER TABLE `rule_conditions` DROP FOREIGN KEY `rule_conditions_rule_id_rules_id_fk`;
--> statement-breakpoint
ALTER TABLE `rules` DROP FOREIGN KEY `rules_diet_category_id_diet_categories_id_fk`;
--> statement-breakpoint
ALTER TABLE `assessments` MODIFY COLUMN `age` smallint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `assessments` MODIFY COLUMN `height_cm` decimal unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `assessments` MODIFY COLUMN `current_weight_kg` decimal unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `assessments` MODIFY COLUMN `target_weight_kg` decimal unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `assessments_facts` MODIFY COLUMN `value` boolean NOT NULL;--> statement-breakpoint
ALTER TABLE `interface_logs` MODIFY COLUMN `event_type` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `recommendation_result_actions` MODIFY COLUMN `sort_order` int NOT NULL DEFAULT 1;--> statement-breakpoint
ALTER TABLE `rule_actions` MODIFY COLUMN `parameter` int NOT NULL DEFAULT 1;--> statement-breakpoint
ALTER TABLE `rules` MODIFY COLUMN `priority` varchar(255) NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `assessments` ADD `status` enum('in_progress','completed','inconclusive','cancelled') DEFAULT 'in_progress' NOT NULL;--> statement-breakpoint
ALTER TABLE `assessments` ADD `started_at` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `assessments` ADD `completed_at` timestamp;--> statement-breakpoint
ALTER TABLE `assessments_facts` ADD `answered_at` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `fact_definitions` ADD `question_text` text NOT NULL;--> statement-breakpoint
ALTER TABLE `fact_definitions` ADD `is_Active` boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE `goals` ADD `diet_category_id` bigint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `goals` ADD `is_active` boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE `interface_logs` ADD `user_id` bigint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `interface_logs` ADD `message` text;--> statement-breakpoint
ALTER TABLE `interface_logs` ADD `metadata` json;--> statement-breakpoint
ALTER TABLE `recommendation_results` ADD `status` enum('confirmed','not_confirmed','inconclusive');--> statement-breakpoint
ALTER TABLE `recommendation_results` ADD `explanation` text;--> statement-breakpoint
ALTER TABLE `rule_conditions` ADD `rule_group_id` bigint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `rule_conditions` ADD `expected_value` boolean NOT NULL;--> statement-breakpoint
ALTER TABLE `rule_conditions` ADD `sort_order` int DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE `actions` ADD CONSTRAINT `actions_code_unique` UNIQUE(`code`);--> statement-breakpoint
ALTER TABLE `diet_categories` ADD CONSTRAINT `diet_categories_code_unique` UNIQUE(`code`);--> statement-breakpoint
ALTER TABLE `fact_definitions` ADD CONSTRAINT `fact_definitions_code_unique` UNIQUE(`code`);--> statement-breakpoint
ALTER TABLE `goals` ADD CONSTRAINT `goals_code_unique` UNIQUE(`code`);--> statement-breakpoint
ALTER TABLE `rules` ADD CONSTRAINT `rules_code_unique` UNIQUE(`code`);--> statement-breakpoint
ALTER TABLE `interface_logs` ADD CONSTRAINT `interface_logs_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rule_conditions` ADD CONSTRAINT `rule_conditions_rule_group_id_rule_condition_groups_id_fk` FOREIGN KEY (`rule_group_id`) REFERENCES `rule_condition_groups`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `actions` DROP COLUMN `category`;--> statement-breakpoint
ALTER TABLE `actions` DROP COLUMN `content`;--> statement-breakpoint
ALTER TABLE `assessments_facts` DROP COLUMN `source`;--> statement-breakpoint
ALTER TABLE `fact_definitions` DROP COLUMN `data_type`;--> statement-breakpoint
ALTER TABLE `fact_definitions` DROP COLUMN `unit`;--> statement-breakpoint
ALTER TABLE `interface_logs` DROP COLUMN `rule_id`;--> statement-breakpoint
ALTER TABLE `interface_logs` DROP COLUMN `status`;--> statement-breakpoint
ALTER TABLE `recommendation_result_actions` DROP COLUMN `action_snapshot`;--> statement-breakpoint
ALTER TABLE `recommendation_results` DROP COLUMN `diet_category_id`;--> statement-breakpoint
ALTER TABLE `recommendation_results` DROP COLUMN `summary`;--> statement-breakpoint
ALTER TABLE `recommendation_results` DROP COLUMN `result_data`;--> statement-breakpoint
ALTER TABLE `rule_actions` DROP COLUMN `sequence`;--> statement-breakpoint
ALTER TABLE `rule_conditions` DROP COLUMN `rule_id`;--> statement-breakpoint
ALTER TABLE `rule_conditions` DROP COLUMN `operator`;--> statement-breakpoint
ALTER TABLE `rule_conditions` DROP COLUMN `value`;--> statement-breakpoint
ALTER TABLE `rule_conditions` DROP COLUMN `priority`;--> statement-breakpoint
ALTER TABLE `rule_conditions` DROP COLUMN `group_no`;--> statement-breakpoint
ALTER TABLE `rule_conditions` DROP COLUMN `sequence`;--> statement-breakpoint
ALTER TABLE `rules` DROP COLUMN `diet_category_id`;--> statement-breakpoint
ALTER TABLE `rules` DROP COLUMN `version`;