import { useState, useRef, useCallback, useEffect } from 'react';
import type { ReactNode, DragEvent } from 'react';
import { GripVertical, Pencil, Eye, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ============================================
// TYPES
// ============================================

export interface GridCardState {
  id: number;
  columnStart: number;   // 1-12 (CSS grid is 1-indexed)
  columnSpan: number;    // 1-12
  heightPx: number;      // user-set height in pixels
}

interface ResizableGridProps {
  children: ReactNode[];
  cardStates: GridCardState[];
  onCardStatesChange: (states: GridCardState[]) => void;
}

// ============================================
// CONSTANTS
// ============================================

const TOTAL_COLUMNS = 12;
const MIN_COLUMN_SPAN = 2;
const MIN_HEIGHT_PX = 100;
// const SNAP_THRESHOLD = 0.5; // snap when within 50% of column boundary

// ============================================
// MAIN COMPONENT
// ============================================

export function ResizableGrid({ children, cardStates, onCardStatesChange }: ResizableGridProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // Get column width in pixels (for drag/resize calculations)
  const getColumnWidth = useCallback(() => {
    if (!gridRef.current) return 80;
    return gridRef.current.offsetWidth / TOTAL_COLUMNS;
  }, []);

  // Update a single card's state
  const updateCardState = useCallback((id: number, updates: Partial<GridCardState>) => {
    onCardStatesChange(
      cardStates.map(card => 
        card.id === id ? { ...card, ...updates } : card
      )
    );
  }, [cardStates, onCardStatesChange]);

  // Reorder cards in array order (DOM order controls grid placement)
  const handleReorder = useCallback((sourceId: number, targetId: number) => {
    if (sourceId === targetId) return;
    const sourceIndex = cardStates.findIndex((c) => c.id === sourceId);
    const targetIndex = cardStates.findIndex((c) => c.id === targetId);
    if (sourceIndex === -1 || targetIndex === -1) return;

    const next = [...cardStates];
    const [moved] = next.splice(sourceIndex, 1);
    next.splice(targetIndex, 0, moved);
    onCardStatesChange(next);
  }, [cardStates, onCardStatesChange]);

  return (
    <div className="space-y-3">
      {/* Edit/View mode toggle */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditMode(!isEditMode)}
          className="gap-2"
        >
          {isEditMode ? (
            <>
              <Eye className="w-4 h-4" />
              View Mode
            </>
          ) : (
            <>
              <Pencil className="w-4 h-4" />
              Edit Layout
            </>
          )}
        </Button>
      </div>

      {/* CSS Grid container */}
      <div
        ref={gridRef}
        className="grid gap-3"
        style={{
          gridTemplateColumns: `repeat(${TOTAL_COLUMNS}, 1fr)`,
          gridAutoRows: 'auto',
        }}
      >
        {children.map((child, index) => {
          const state = cardStates[index];
          if (!state) return null;

          return (
            <GridCard
              key={state.id}
              state={state}
              isEditMode={isEditMode}
              getColumnWidth={getColumnWidth}
              onStateChange={(updates) => updateCardState(state.id, updates)}
              onReorder={handleReorder}
            >
              {child}
            </GridCard>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// GRID CARD (handles drag & resize)
// ============================================

interface GridCardProps {
  state: GridCardState;
  isEditMode: boolean;
  getColumnWidth: () => number;
  onStateChange: (updates: Partial<GridCardState>) => void;
  onReorder: (sourceId: number, targetId: number) => void;
  children: ReactNode;
}

function GridCard({
  state,
  isEditMode,
  getColumnWidth,
  onStateChange,
  onReorder,
  children,
}: GridCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<'horizontal' | 'vertical' | 'both' | null>(null);
  const [minContentHeight, setMinContentHeight] = useState(MIN_HEIGHT_PX);

  // Measure content to derive minimum height
  useEffect(() => {
    if (contentRef.current) {
      const measured = contentRef.current.scrollHeight;
      setMinContentHeight(Math.max(measured, MIN_HEIGHT_PX));
    }
  }, [children]);

  // Final computed sizes (never smaller than content)
  const finalHeight = Math.max(state.heightPx, minContentHeight);
  const finalColumnSpan = Math.max(state.columnSpan, MIN_COLUMN_SPAN);

  // Clamp columnStart so card doesn't overflow grid
  const clampedColumnStart = Math.min(
    Math.max(1, state.columnStart),
    TOTAL_COLUMNS - finalColumnSpan + 1
  );

  // ---- DRAG LOGIC ----
  const handleDragStart = useCallback((e: React.MouseEvent) => {
    if (!isEditMode) return;
    e.preventDefault();
    setIsDragging(true);

    const startX = e.clientX;
    const startColumnStart = state.columnStart;
    const colWidth = getColumnWidth();

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaColumns = Math.round(deltaX / colWidth);
      const newColumnStart = Math.min(
        Math.max(1, startColumnStart + deltaColumns),
        TOTAL_COLUMNS - finalColumnSpan + 1
      );
      onStateChange({ columnStart: newColumnStart });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [isEditMode, state.columnStart, finalColumnSpan, getColumnWidth, onStateChange]);

  // ---- RESIZE LOGIC ----
  const handleResizeStart = useCallback((
    e: React.MouseEvent,
    direction: 'horizontal' | 'vertical' | 'both'
  ) => {
    if (!isEditMode) return;
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(direction);

    const startX = e.clientX;
    const startY = e.clientY;
    const startColumnSpan = state.columnSpan;
    const startHeight = state.heightPx;
    const colWidth = getColumnWidth();

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (direction === 'horizontal' || direction === 'both') {
        const deltaX = moveEvent.clientX - startX;
        const deltaColumns = Math.round(deltaX / colWidth);
        const newColumnSpan = Math.min(
          Math.max(MIN_COLUMN_SPAN, startColumnSpan + deltaColumns),
          TOTAL_COLUMNS - state.columnStart + 1
        );
        onStateChange({ columnSpan: newColumnSpan });
      }

      if (direction === 'vertical' || direction === 'both') {
        const deltaY = moveEvent.clientY - startY;
        const newHeight = Math.max(MIN_HEIGHT_PX, startHeight + deltaY);
        onStateChange({ heightPx: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsResizing(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [isEditMode, state.columnSpan, state.heightPx, state.columnStart, getColumnWidth, onStateChange]);

  // Determine if content overflows (show scrollbar)
  const needsScroll = state.heightPx < minContentHeight;

  // ---- REORDER LOGIC (HTML5 drag & drop) ----
  const handleReorderStart = useCallback((e: DragEvent) => {
    if (!isEditMode) return;
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(state.id));
  }, [isEditMode, state.id]);

  const handleReorderOver = useCallback((e: DragEvent) => {
    if (!isEditMode) return;
    e.preventDefault(); // allow drop
    e.dataTransfer.dropEffect = 'move';
  }, [isEditMode]);

  const handleReorderDrop = useCallback((e: DragEvent) => {
    if (!isEditMode) return;
    e.preventDefault();
    const sourceId = Number(e.dataTransfer.getData('text/plain'));
    if (!Number.isNaN(sourceId)) {
      onReorder(sourceId, state.id);
    }
    setIsDragging(false);
  }, [isEditMode, onReorder, state.id]);

  const handleReorderEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`
        relative bg-card border border-border rounded
        ${isDragging ? 'opacity-75 cursor-grabbing z-10' : ''}
        ${isResizing ? 'z-10' : ''}
        ${isEditMode ? 'ring-1 ring-primary/20' : ''}
      `}
      style={{
        gridColumn: `${clampedColumnStart} / span ${finalColumnSpan}`,
        height: `${finalHeight}px`,
      }}
      onDragOver={handleReorderOver}
      onDrop={handleReorderDrop}
    >
      {isEditMode && (
        <div
          className="absolute bottom-2 right-2 w-7 h-7 flex items-center justify-center cursor-move bg-muted/70 hover:bg-muted z-30 rounded"
          draggable
          onDragStart={handleReorderStart}
          onDragOver={handleReorderOver}
          onDrop={handleReorderDrop}
          onDragEnd={handleReorderEnd}
        >
          <Move className="w-4 h-4 text-muted-foreground" />
        </div>
      )}

      {/* Content area */}
      <div
        ref={contentRef}
        className={`
          h-full
          ${isEditMode ? 'pl-6' : ''}
          ${needsScroll ? 'overflow-auto' : 'overflow-hidden'}
          ${isEditMode ? 'pointer-events-none select-none' : ''}
        `}
      >
        {children}
      </div>

      {/* Resize handles (only in edit mode) */}
      {isEditMode && (
        <>
          {/* Left edge: column drag within grid */}
          <div
            className="absolute top-0 left-0 w-6 h-full flex items-center justify-center cursor-grab hover:bg-muted/50 z-20"
            onMouseDown={handleDragStart}
          >
            <GripVertical className="w-4 h-4 text-muted-foreground" />
          </div>

          {/* Right edge: horizontal resize */}
          <div
            className="absolute top-0 right-0 w-2 h-full cursor-ew-resize hover:bg-primary/20 z-20"
            onMouseDown={(e) => handleResizeStart(e, 'horizontal')}
          />

          {/* Bottom edge: vertical resize */}
          <div
            className="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize hover:bg-primary/20 z-20"
            onMouseDown={(e) => handleResizeStart(e, 'vertical')}
          />

          {/* Bottom-right corner: both directions */}
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize hover:bg-primary/30 z-20"
            onMouseDown={(e) => handleResizeStart(e, 'both')}
          />
        </>
      )}
    </div>
  );
}
