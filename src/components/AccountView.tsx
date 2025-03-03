import React from 'react';
import { ArrowLeft, Mail, User, Lock } from 'lucide-react';

const AccountView = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>

        <div className="bg-card rounded-lg border border-border p-8">
          <h2 className="text-2xl font-semibold mb-8">Account Settings</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Profile</label>
              <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
                <div className="p-3 bg-primary/10 rounded-full">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">John Doe</h3>
                  <p className="text-sm text-muted-foreground">Researcher</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="email"
                  value="john.doe@example.com"
                  className="w-full bg-secondary pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  readOnly
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium mb-2">Change Password</label>
              <div className="space-y-3">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="password"
                    placeholder="Current password"
                    className="w-full bg-secondary pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="password"
                    placeholder="New password"
                    className="w-full bg-secondary pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountView;