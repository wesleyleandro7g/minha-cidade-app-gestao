CREATE TABLE `banners` (
	`id` varchar(128) NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`image_uri` text,
	`link` text,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `banners_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` varchar(128) NOT NULL,
	`name` text NOT NULL,
	`icon_name` text,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cities` (
	`id` varchar(128) NOT NULL,
	`name` text NOT NULL,
	`state` text,
	`zip_code` text,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `cities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `companies` (
	`id` varchar(128) NOT NULL,
	`name` text NOT NULL,
	`slogan` text,
	`description` text,
	`address` text,
	`email` text,
	`phone` text,
	`whatsapp` text,
	`instagram` text,
	`website` text,
	`banner_uri` text,
	`logo_uri` text,
	`city_id` varchar(128),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `companies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `companies_to_categories` (
	`id` varchar(128) NOT NULL,
	`company_id` varchar(128),
	`category_id` varchar(128),
	CONSTRAINT `companies_to_categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `offers` (
	`id` varchar(128) NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`image_uri` text,
	`link` text,
	`is_active` boolean DEFAULT true,
	`company_id` varchar(128),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `offers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `root_users` (
	`id` varchar(128) NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`password` text,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `root_users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(128) NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`password` text,
	`is_active` boolean DEFAULT true,
	`city_id` varchar(128),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `companies` ADD CONSTRAINT `companies_city_id_cities_id_fk` FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `companies_to_categories` ADD CONSTRAINT `companies_to_categories_company_id_companies_id_fk` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `companies_to_categories` ADD CONSTRAINT `companies_to_categories_category_id_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `offers` ADD CONSTRAINT `offers_company_id_companies_id_fk` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_city_id_cities_id_fk` FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`) ON DELETE no action ON UPDATE no action;