import React from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun,
  Globe,
  Bell,
  Shield,
  Key,
  Save
} from 'lucide-react';

const Settings = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Settings</h2>
        </div>

        <div className="space-y-6">
          {/* Appearance */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Sun className="h-5 w-5" />
              Appearance
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Theme</label>
                <select className="bg-secondary px-3 py-1.5 rounded text-sm">
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Font Size</label>
                <select className="bg-secondary px-3 py-1.5 rounded text-sm">
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>
            </div>
          </div>

          {/* Editor Settings */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Editor Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Default Template</label>
                <select className="bg-secondary px-3 py-1.5 rounded text-sm">
                  <option value="article">Article</option>
                  <option value="report">Report</option>
                  <option value="book">Book</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Auto Save</label>
                <select className="bg-secondary px-3 py-1.5 rounded text-sm">
                  <option value="off">Off</option>
                  <option value="1">Every minute</option>
                  <option value="5">Every 5 minutes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Email Notifications</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-secondary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Desktop Notifications</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-secondary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Two-Factor Authentication</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-secondary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <button className="flex items-center gap-2 text-sm text-primary hover:underline">
                <Key className="h-4 w-4" />
                Change Password
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;