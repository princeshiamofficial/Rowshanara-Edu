"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BarChart3,
  Activity,
  CheckSquare,
  PieChart,
  Grid,
  Settings,
  FileText,
  Search,
  MessageSquare,
  ChevronsUpDown,
  ChevronDown,
  ChevronUp,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  School,
  Users,
  LayoutDashboard,
  GraduationCap
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  activeSubTab?: string;
  setActiveSubTab?: (subTab: string) => void;
}

// Route map: sidebar item name → URL path
const NAV_ROUTES: Record<string, string> = {
  Dashboard:     '/admin/dashboard',
  Applications:  '/admin/applications',
  Consultations: '/admin/consultations',
  Universities:  '/admin/universities',
};

export default function AdminSidebar({ 
  activeTab, 
  setActiveTab, 
  onLogout,
  activeSubTab: propActiveSubTab,
  setActiveSubTab: propSetActiveSubTab
}: AdminSidebarProps) {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isEmblemHovered, setIsEmblemHovered] = useState(false);
  
  // Track open state for dropdown menus. Settings is open by default matching reference.
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    Settings: true,
  });

  // Track active sub-menu item. Billing is active by default.
  const [localActiveSubTab, setLocalActiveSubTab] = useState('Billing');
  const activeSubTab = propActiveSubTab !== undefined ? propActiveSubTab : localActiveSubTab;
  const setActiveSubTab = propSetActiveSubTab !== undefined ? propSetActiveSubTab : setLocalActiveSubTab;

  const toggleMenu = (menuName: string) => {
    setOpenMenus(prev => ({ ...prev, [menuName]: !prev[menuName] }));
  };

  const handleMainMenuClick = (itemName: string, hasSubMenu: boolean) => {
    if (isCollapsed) {
      setIsCollapsed(false);
    }
    
    if (hasSubMenu) {
      toggleMenu(itemName);
    } else {
      setActiveTab(itemName);
      const route = NAV_ROUTES[itemName];
      if (route) router.push(route);
    }
  };

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, badge: null, hasSubMenu: false },
    { name: 'Applications', icon: <GraduationCap size={20} />, badge: 10, hasSubMenu: false },
    { name: 'Consultations', icon: <Users size={20} />, badge: 8, hasSubMenu: false },
    { name: 'Universities', icon: <School size={20} />, badge: null, hasSubMenu: false },
    { name: 'Settings', icon: <Settings size={20} />, badge: null, hasSubMenu: true, key: 'Settings', subMenu: ['General', 'Destinations', 'Services', 'Billing', 'Consultants'] },
  ];

  return (
    <>
      {/* Layout Spacer to prevent content overlap */}
      <div
        style={{
          width: isCollapsed ? '80px' : '14%',
          flexShrink: 0,
          transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      <aside
        style={{
          width: isCollapsed ? '80px' : '14%',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #F2F4F7',
          display: 'flex',
          flexDirection: 'column',
          padding: isCollapsed ? '0.75rem 0.75rem 1.5rem' : '0.75rem 1rem 1.5rem',
          flexShrink: 0,
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          fontFamily: 'var(--font-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          boxSizing: 'border-box',
          overflowX: 'hidden',
          zIndex: 50,
        }}
      >
      {/* Brand Selector Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: isCollapsed ? '0.5rem 0.5rem' : '0.625rem 0.75rem',
          backgroundColor: '#000000',
          margin: isCollapsed ? '-0.75rem -0.75rem 1rem -0.75rem' : '-0.75rem -1rem 1rem -1rem',
          width: 'auto',
          boxSizing: 'border-box',
          justifyContent: 'center',
        }}
      >
        {isCollapsed ? (
          /* Collapsed State: Gold brand circle emblem (hover to reveal expand icon) */
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #ffb74d 0%, #e09100 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(224, 145, 0, 0.2)',
              color: 'white',
              flexShrink: 0,
              cursor: 'pointer',
              position: 'relative'
            }}
            onClick={() => {
              setIsCollapsed(false);
              setIsEmblemHovered(false);
            }}
            onMouseEnter={() => setIsEmblemHovered(true)}
            onMouseLeave={() => setIsEmblemHovered(false)}
            title="Expand sidebar"
          >
            <div
              className="emblem-logo"
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: '5.5px solid rgba(255,255,255,0.9)',
                boxSizing: 'border-box',
                transition: 'opacity 0.2s',
                position: 'absolute',
                opacity: isEmblemHovered ? 0 : 1
              }}
            ></div>
            <div
              className="expand-icon"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: isEmblemHovered ? 1 : 0,
                transition: 'opacity 0.2s',
                position: 'absolute'
              }}
            >
              <PanelLeftOpen size={20} />
            </div>
          </div>
        ) : (
          /* Expanded State: Official Rowshanara Edu logo with collapse button */
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              gap: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flex: 1, paddingLeft: '1.25rem' }}>
              <img
                src="/logo.png"
                alt="Rowshanara Edu"
                style={{
                  height: '44px',
                  width: 'auto',
                  display: 'block',
                  maxWidth: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>
            <button
              onClick={() => {
                setIsCollapsed(true);
                setIsEmblemHovered(false);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.35rem',
                borderRadius: '6px',
                transition: 'all 0.2s',
                marginRight: '0.25rem',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#ffb74d';
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              title="Collapse sidebar"
            >
              <PanelLeftClose size={18} />
            </button>
          </div>
        )}
      </div>





      {/* Main Nav Items List */}
      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          flexGrow: 1,
          width: '100%',
          boxSizing: 'border-box',
          overflowY: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {navItems.map((item) => {
          const isItemActive = activeTab === item.name || (item.hasSubMenu && openMenus[item.name]);
          const isHovered = hoveredItem === item.name;

          return (
            <div key={item.name} style={{ width: '100%', position: 'relative' }}>
              <button
                onClick={() => handleMainMenuClick(item.name, item.hasSubMenu)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isCollapsed ? '0' : '0.75rem',
                  width: '100%',
                  padding: '0.625rem 0.75rem',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: isItemActive && !item.hasSubMenu ? '#F9F5FF' : 'transparent',
                  color: isItemActive && !item.hasSubMenu ? '#175CD3' : '#344054',
                  fontWeight: isItemActive && !item.hasSubMenu ? 600 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                }}
                onMouseEnter={(e) => {
                  setHoveredItem(item.name);
                  if (!isItemActive || item.hasSubMenu) {
                    e.currentTarget.style.backgroundColor = '#F9FAFB';
                  }
                }}
                onMouseLeave={(e) => {
                  setHoveredItem(null);
                  if (!isItemActive || item.hasSubMenu) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {/* Icon wrapper */}
                <div
                  style={{
                    color: isItemActive && !item.hasSubMenu ? '#175CD3' : '#475467',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>

                {/* Text Description - hidden when collapsed */}
                {!isCollapsed && <span style={{ flexGrow: 1, textAlign: 'left' }}>{item.name}</span>}

                {/* Badges - hidden when collapsed */}
                {!isCollapsed && item.badge !== null && (
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#175CD3',
                      backgroundColor: '#EFF8FF',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      flexShrink: 0,
                    }}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Chevrons for expandable menus - hidden when collapsed */}
                {!isCollapsed && item.hasSubMenu && (
                  <div style={{ color: '#98A2B3', display: 'flex', alignItems: 'center' }}>
                    {openMenus[item.name] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                )}
              </button>

              {/* Collapsed Tooltip Hover */}
              {isCollapsed && isHovered && (
                <div
                  style={{
                    position: 'absolute',
                    left: '80px',
                    top: 'calc(50% - 15px)',
                    backgroundColor: '#101828',
                    color: '#ffffff',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    whiteSpace: 'nowrap',
                    zIndex: 100,
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: '-4px',
                      top: 'calc(50% - 4px)',
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#101828',
                      transform: 'rotate(45deg)',
                    }}
                  ></div>
                  {item.name}
                </div>
              )}

              {/* Sub-menu panel - hidden when collapsed */}
              {!isCollapsed && item.hasSubMenu && openMenus[item.name] && item.subMenu && (
                <div style={{ position: 'relative', marginTop: '0.25rem', width: '100%', boxSizing: 'border-box' }}>
                  {/* Vertical Gray Connection Line */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '23px',
                      top: '0',
                      bottom: '0',
                      width: '1px',
                      backgroundColor: '#F2F4F7',
                      zIndex: 1,
                    }}
                  ></div>

                  {/* Sub links wrapper */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.15rem',
                      paddingLeft: '2.5rem',
                      width: '100%',
                      boxSizing: 'border-box',
                    }}
                  >
                    {item.subMenu.map((subLink) => {
                      const isSubActive = activeSubTab === subLink;
                      return (
                        <button
                          key={subLink}
                          onClick={() => setActiveSubTab(subLink)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            padding: '0.5rem 0.75rem',
                            border: 'none',
                            borderRadius: '6px',
                            backgroundColor: isSubActive ? '#F9F5FF' : 'transparent',
                            color: isSubActive ? '#175CD3' : '#475467',
                            fontWeight: isSubActive ? 600 : 500,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            textAlign: 'left',
                            position: 'relative',
                            transition: 'all 0.15s',
                          }}
                        >
                          {/* Circle dot aligned on the connector line */}
                          {isSubActive && (
                            <div
                              style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                backgroundColor: '#175CD3',
                                position: 'absolute',
                                left: '-19.5px', // Exact alignment on the 23px vertical line
                                top: 'calc(50% - 3px)',
                                zIndex: 5,
                              }}
                            ></div>
                          )}
                          <span>{subLink}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer Block */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          marginTop: 'auto',
          width: '100%',
          boxSizing: 'border-box',
          paddingTop: '1rem',
          borderTop: '1px solid #F2F4F7',
        }}
      >


        {/* Logout Button */}
        <div style={{ position: 'relative', width: '100%' }}>
          <button
            onClick={onLogout}
            onMouseEnter={(e) => {
              setHoveredItem('Logout');
              e.currentTarget.style.backgroundColor = '#FEF3F2';
              e.currentTarget.style.color = '#B42318';
              const iconDiv = e.currentTarget.querySelector('.logout-icon-wrapper');
              if (iconDiv) (iconDiv as HTMLElement).style.color = '#B42318';
            }}
            onMouseLeave={(e) => {
              setHoveredItem(null);
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#344054';
              const iconDiv = e.currentTarget.querySelector('.logout-icon-wrapper');
              if (iconDiv) (iconDiv as HTMLElement).style.color = '#475467';
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: isCollapsed ? '0' : '0.75rem',
              width: '100%',
              padding: '0.625rem 0.75rem',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: 'transparent',
              color: '#344054',
              fontWeight: 500,
              fontSize: '0.9rem',
              cursor: 'pointer',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              transition: 'all 0.2s',
              boxSizing: 'border-box',
            }}
          >
            <div
              className="logout-icon-wrapper"
              style={{
                color: '#475467',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'color 0.2s',
              }}
            >
              <LogOut size={20} />
            </div>

            {!isCollapsed && <span style={{ flexGrow: 1, textAlign: 'left' }}>Logout</span>}
          </button>

          {/* Collapsed Tooltip */}
          {isCollapsed && hoveredItem === 'Logout' && (
            <div
              style={{
                position: 'absolute',
                left: '80px',
                top: 'calc(50% - 15px)',
                backgroundColor: '#101828',
                color: '#ffffff',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                whiteSpace: 'nowrap',
                zIndex: 100,
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: '-4px',
                  top: 'calc(50% - 4px)',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#101828',
                  transform: 'rotate(45deg)',
                }}
              ></div>
              Logout
            </div>
          )}
        </div>
      </div>
    </aside>
    </>
  );
}
