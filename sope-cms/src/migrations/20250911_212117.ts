import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`quem_somos_principios_section_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text NOT NULL,
  	\`text\` text,
  	\`image_id\` integer,
  	\`image_position\` text DEFAULT 'right',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`quem_somos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`quem_somos_principios_section_content_order_idx\` ON \`quem_somos_principios_section_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`quem_somos_principios_section_content_parent_id_idx\` ON \`quem_somos_principios_section_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`quem_somos_principios_section_content_image_idx\` ON \`quem_somos_principios_section_content\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`quem_somos_pretendemo_section_bullet_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`quem_somos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`quem_somos_pretendemo_section_bullet_points_order_idx\` ON \`quem_somos_pretendemo_section_bullet_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`quem_somos_pretendemo_section_bullet_points_parent_id_idx\` ON \`quem_somos_pretendemo_section_bullet_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`quem_somos_equipa_section_team_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`quem_somos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`quem_somos_equipa_section_team_members_order_idx\` ON \`quem_somos_equipa_section_team_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`quem_somos_equipa_section_team_members_parent_id_idx\` ON \`quem_somos_equipa_section_team_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`quem_somos_equipa_section_team_members_image_idx\` ON \`quem_somos_equipa_section_team_members\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`quem_somos\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_title\` text NOT NULL,
  	\`hero_description\` text NOT NULL,
  	\`hero_image_id\` integer NOT NULL,
  	\`o_sope_section_title\` text DEFAULT 'O Sopé...' NOT NULL,
  	\`o_sope_section_text\` text NOT NULL,
  	\`principios_section_title\` text DEFAULT 'Nossos Princípios' NOT NULL,
  	\`pretendemo_section_title\` text DEFAULT 'O Que Pretendemos' NOT NULL,
  	\`pretendemo_section_layout\` text DEFAULT 'text-left',
  	\`pretendemo_section_image_id\` integer,
  	\`equipa_section_title\` text DEFAULT 'A Nossa Equipa' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`pretendemo_section_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`quem_somos_hero_hero_image_idx\` ON \`quem_somos\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`quem_somos_pretendemo_section_pretendemo_section_image_idx\` ON \`quem_somos\` (\`pretendemo_section_image_id\`);`)
  await db.run(sql`CREATE TABLE \`inscricoes_programs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`age_range\` text,
  	\`image_id\` integer NOT NULL,
  	\`image_position\` text DEFAULT 'left' NOT NULL,
  	\`background_color\` text DEFAULT 'white' NOT NULL,
  	\`buttons_inscricao_button_text\` text DEFAULT 'INSCRIÇÃO' NOT NULL,
  	\`buttons_inscricao_button_link\` text NOT NULL,
  	\`buttons_informacoes_button_text\` text DEFAULT 'INFORMAÇÕES' NOT NULL,
  	\`buttons_informacoes_button_link\` text NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`inscricoes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`inscricoes_programs_order_idx\` ON \`inscricoes_programs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`inscricoes_programs_parent_id_idx\` ON \`inscricoes_programs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`inscricoes_programs_image_idx\` ON \`inscricoes_programs\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`inscricoes\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_title\` text NOT NULL,
  	\`hero_description\` text,
  	\`hero_image_id\` integer NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`inscricoes_hero_hero_image_idx\` ON \`inscricoes\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE TABLE \`contactos_opening_hours_schedule\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`day\` text NOT NULL,
  	\`hours\` text NOT NULL,
  	\`notes\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contactos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contactos_opening_hours_schedule_order_idx\` ON \`contactos_opening_hours_schedule\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`contactos_opening_hours_schedule_parent_id_idx\` ON \`contactos_opening_hours_schedule\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`contactos\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_title\` text DEFAULT 'Contactos' NOT NULL,
  	\`hero_description\` text,
  	\`hero_image_id\` integer NOT NULL,
  	\`contact_info_phone\` text DEFAULT '+351 950 270 856' NOT NULL,
  	\`contact_info_email\` text DEFAULT 'sope.silvere@gmail.com' NOT NULL,
  	\`contact_info_address_street\` text DEFAULT 'Est. da Charneca, Benedita' NOT NULL,
  	\`contact_info_address_postal_code\` text DEFAULT '2475-024' NOT NULL,
  	\`contact_info_address_description\` text,
  	\`contact_info_social_media_instagram\` text,
  	\`contact_info_social_media_facebook\` text,
  	\`contact_form_title\` text DEFAULT 'Fale Connosco' NOT NULL,
  	\`contact_form_description\` text DEFAULT 'Tem alguma questão? Não hesite em contactar-nos.',
  	\`contact_form_submit_button_text\` text DEFAULT 'Enviar Mensagem' NOT NULL,
  	\`opening_hours_title\` text DEFAULT 'Horários' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`contactos_hero_hero_image_idx\` ON \`contactos\` (\`hero_image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`quem_somos_principios_section_content\`;`)
  await db.run(sql`DROP TABLE \`quem_somos_pretendemo_section_bullet_points\`;`)
  await db.run(sql`DROP TABLE \`quem_somos_equipa_section_team_members\`;`)
  await db.run(sql`DROP TABLE \`quem_somos\`;`)
  await db.run(sql`DROP TABLE \`inscricoes_programs\`;`)
  await db.run(sql`DROP TABLE \`inscricoes\`;`)
  await db.run(sql`DROP TABLE \`contactos_opening_hours_schedule\`;`)
  await db.run(sql`DROP TABLE \`contactos\`;`)
}
