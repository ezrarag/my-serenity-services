# Character Logo Implementation TODO

## Overview
Implement a character logo with SVG and video popup functionality as part of the auto-play video cards.

## Requirements
- Create an SVG version of the character logo provided by the client
- Integrate with the existing video card system
- Add video popup functionality when logo is clicked
- Determine optimal placement within the current design

## Implementation Plan

### Phase 1: SVG Creation
- [ ] Convert client-provided character logo to SVG format
- [ ] Ensure SVG is scalable and responsive
- [ ] Optimize for web performance
- [ ] Test across different screen sizes

### Phase 2: Integration with Video Cards
- [ ] Add logo overlay to service cards
- [ ] Position logo strategically (considering current card layout)
- [ ] Ensure logo doesn't interfere with existing hover effects
- [ ] Make logo clickable to trigger video popup

### Phase 3: Video Popup Functionality
- [ ] Create modal/dialog component for video popup
- [ ] Integrate with existing video assets
- [ ] Add smooth animations for popup open/close
- [ ] Ensure popup is responsive and accessible

### Phase 4: Placement Strategy
Consider these potential locations:
- [ ] Overlay on top-right corner of service cards
- [ ] Floating logo in bottom-right corner of screen
- [ ] Integrated into the hero section
- [ ] Part of the navigation/header area
- [ ] Dedicated section between hero and services

### Technical Considerations
- [ ] Use Framer Motion for smooth animations
- [ ] Ensure logo works with existing scroll effects
- [ ] Test performance impact of additional SVG
- [ ] Consider loading states for video popup
- [ ] Mobile responsiveness for logo and popup

### Design Considerations
- [ ] Logo should complement existing design aesthetic
- [ ] Ensure sufficient contrast for visibility
- [ ] Consider brand consistency
- [ ] Test with current color scheme (#284C67, #154058, #C9BEE2)

## Current Context
- Services section has stacked cards with hover effects
- Cards have auto-play videos on hover
- Scroll-based animations are implemented
- Mobile menu uses #C9BEE2 background
- Text uses #284C67 color scheme

## Next Steps
1. Review client-provided character logo
2. Determine optimal placement strategy
3. Create SVG version of logo
4. Implement basic logo placement
5. Add video popup functionality
6. Test and refine animations
