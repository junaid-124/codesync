import React, { useState, useRef, useEffect } from 'react';
import styles from './AddItemModal.module.css';
import { RiArrowDownSLine, RiArrowUpSLine, RiCloseCircleFill } from 'react-icons/ri';

interface AddItemModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

const ITEM_TYPES = ['Achievements', 'Projects', 'Internships', 'Certifications'];

const AddItemModal: React.FC<AddItemModalProps> = ({ onClose, onSave }) => {
  const [type, setType] = useState('Internships'); // Default matching image
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const wordCount = description.trim().split(/\s+/).filter(w => w.length > 0).length;

  const handleCreate = () => {
    onSave({ type, title, description, tags, link, startDate, endDate });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        
        <div className={styles.header}>
          <h2>Add New Item</h2>
        </div>

        <div className={styles.formContent}>
          
          {/* Type Dropdown */}
          <div className={styles.inputGroup} ref={dropdownRef}>
            <div 
              className={`${styles.customSelect} ${isDropdownOpen ? styles.activeBorder : ''}`} 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className={styles.selectedValue}>{type}</span>
              <span className={styles.arrowIcon}>
                {isDropdownOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
              </span>
              <label className={`${styles.floatingLabel} ${styles.activeLabel}`}>Type *</label>
            </div>
            
            {isDropdownOpen && (
              <ul className={styles.dropdownList}>
                {ITEM_TYPES.map((item) => (
                  <li 
                    key={item} 
                    className={item === type ? styles.selectedItem : ''}
                    onClick={() => {
                      setType(item);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Title */}
          <div className={styles.inputGroup}>
            <input 
              type="text" 
              className={styles.inputField} 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className={styles.floatingLabel}>Title *</label>
          </div>

          {/* Description */}
          <div className={styles.inputGroup}>
            <textarea 
              className={styles.textareaField} 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className={styles.floatingLabel}>Description *</label>
            <div className={styles.helperText}>
              {wordCount}/40 words (30-40 words recommended)
            </div>
          </div>

          {/* Tags */}
          <div className={styles.inputGroup}>
            <div className={styles.tagContainer}>
              {tags.map(tag => (
                <span key={tag} className={styles.tagChip}>
                  {tag} <RiCloseCircleFill onClick={() => removeTag(tag)} className={styles.removeTagIcon}/>
                </span>
              ))}
              <input 
                type="text" 
                className={styles.tagInput}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
              />
            </div>
            <label className={styles.floatingLabel}>Tags</label>
            <div className={styles.helperText}>Press Enter to add a tag</div>
          </div>

          {/* Link */}
          <div className={styles.inputGroup}>
            <input 
              type="text" 
              className={styles.inputField} 
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <label className={styles.floatingLabel}>Link</label>
          </div>

          {/* Date Row (Start & End Date) */}
          <div className={styles.dateRow}>
            <div className={styles.inputGroup}>
              <input 
                type="date" 
                className={styles.inputField} 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
              {/* For date inputs, label must always stay floating because of the placeholder */}
              <label className={`${styles.floatingLabel} ${styles.activeLabel}`}>Start Date *</label>
            </div>

            <div className={styles.inputGroup}>
              <input 
                type="date" 
                className={styles.inputField} 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
              <label className={`${styles.floatingLabel} ${styles.activeLabel}`}>End Date *</label>
            </div>
          </div>

        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.createBtn} onClick={handleCreate}>Create</button>
        </div>

      </div>
    </div>
  );
};

export default AddItemModal;