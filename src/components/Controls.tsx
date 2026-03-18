import React from 'react';

interface ControlsProps {
  name: string;
  race: string;
  location: string;
  condition: string;
  commonness: string;
  onNameChange: (name: string) => void;
  onRaceChange: (race: string) => void;
  onLocationChange: (location: string) => void;
  onConditionChange: (condition: string) => void;
  onCommonnessChange: (commonness: string) => void;
  onApply: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  name,
  race,
  location,
  condition,
  commonness,
  onNameChange,
  onRaceChange,
  onLocationChange,
  onConditionChange,
  onCommonnessChange,
  onApply
}) => {
  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      border: '1px solid #dadce0',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px'
    }}>
      <h2 style={{
        fontSize: '14px',
        fontWeight: 500,
        marginBottom: '12px',
        color: '#202124'
      }}>
        Control Panel
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: '#5f6368', marginBottom: '4px' }}>
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #dadce0',
              borderRadius: '4px',
              fontSize: '14px',
              outline: 'none'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#1a73e8'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#dadce0'}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: '#5f6368', marginBottom: '4px' }}>
            Race
          </label>
          <select
            value={race}
            onChange={(e) => onRaceChange(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #dadce0',
              borderRadius: '4px',
              fontSize: '14px',
              outline: 'none',
              backgroundColor: '#fff'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#1a73e8'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#dadce0'}
          >
            <option value="White American">White American</option>
            <option value="African American">African American</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: '#5f6368', marginBottom: '4px' }}>
            Location (optional)
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #dadce0',
              borderRadius: '4px',
              fontSize: '14px',
              outline: 'none'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#1a73e8'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#dadce0'}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: '#5f6368', marginBottom: '4px' }}>
            Condition
          </label>
          <select
            value={condition}
            onChange={(e) => onConditionChange(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #dadce0',
              borderRadius: '4px',
              fontSize: '14px',
              outline: 'none',
              backgroundColor: '#fff'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#1a73e8'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#dadce0'}
          >
            <option value="High_Present">High + Present</option>
            <option value="High_Absent">High + Absent</option>
            <option value="Low_Present">Low + Present</option>
            <option value="Low_Absent">Low + Absent</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: '#5f6368', marginBottom: '4px' }}>
            Commonness
          </label>
          <select
            value={commonness}
            onChange={(e) => onCommonnessChange(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #dadce0',
              borderRadius: '4px',
              fontSize: '14px',
              outline: 'none',
              backgroundColor: '#fff'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#1a73e8'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#dadce0'}
          >
            <option value="Common name">Common name</option>
            <option value="Uncommon name">Uncommon name</option>
          </select>
        </div>
        <button
          onClick={onApply}
          style={{
            padding: '10px 24px',
            backgroundColor: '#1a73e8',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            alignSelf: 'flex-start'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1557b0'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1a73e8'}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

