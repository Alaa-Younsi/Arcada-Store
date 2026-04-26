-- Add missing 'notes' column to orders table
-- Run this in: Supabase Dashboard → SQL Editor

ALTER TABLE orders ADD COLUMN IF NOT EXISTS notes text;
