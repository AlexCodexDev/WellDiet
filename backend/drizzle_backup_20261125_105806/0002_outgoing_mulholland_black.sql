ALTER TABLE `fact_definitions` RENAME COLUMN `is_Active` TO `is_active`;--> statement-breakpoint
ALTER TABLE `rule_actions` RENAME COLUMN `parameter` TO `sort_order`;--> statement-breakpoint
ALTER TABLE `recommendation_results` DROP FOREIGN KEY `recommendation_results_matched_rule_id_rules_id_fk`;
--> statement-breakpoint
ALTER TABLE `actions` MODIFY COLUMN `is_active` boolean NOT NULL DEFAULT true;--> statement-breakpoint
ALTER TABLE `assessments` MODIFY COLUMN `gender` enum('male','female') NOT NULL;--> statement-breakpoint
ALTER TABLE `assessments` MODIFY COLUMN `started_at` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `diet_categories` MODIFY COLUMN `is_active` boolean NOT NULL DEFAULT true;--> statement-breakpoint
ALTER TABLE `fact_definitions` MODIFY COLUMN `is_active` boolean NOT NULL DEFAULT true;--> statement-breakpoint
ALTER TABLE `goals` MODIFY COLUMN `is_active` boolean NOT NULL DEFAULT true;--> statement-breakpoint
ALTER TABLE `recommendation_results` MODIFY COLUMN `matched_rule_id` bigint unsigned;--> statement-breakpoint
ALTER TABLE `recommendation_results` MODIFY COLUMN `status` enum('confirmed','not_confirmed','inconclusive') NOT NULL;--> statement-breakpoint
ALTER TABLE `rules` MODIFY COLUMN `priority` int NOT NULL;--> statement-breakpoint
ALTER TABLE `goals` ADD CONSTRAINT `goals_diet_category_id_diet_categories_id_fk` FOREIGN KEY (`diet_category_id`) REFERENCES `diet_categories`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recommendation_results` ADD CONSTRAINT `recommendation_results_matched_rule_id_rules_id_fk` FOREIGN KEY (`matched_rule_id`) REFERENCES `rules`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rule_condition_groups` ADD CONSTRAINT `rule_condition_groups_rule_id_rules_id_fk` FOREIGN KEY (`rule_id`) REFERENCES `rules`(`id`) ON DELETE cascade ON UPDATE no action;