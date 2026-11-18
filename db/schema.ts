import {sqliteTable,integer,text} from 'drizzle-orm/sqlite-core';
export const analyticsEvents=sqliteTable('analytics_events',{id:integer('id').primaryKey({autoIncrement:true}),event:text('event').notNull(),project:text('project').notNull(),createdAt:text('created_at').notNull()});
