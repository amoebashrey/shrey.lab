// shrey-lab/components/index.ts
//
// Barrel export for the entire component library.
//   import { Button, Card, Hero, WaffleChart } from '@/shrey-lab/components';

// Foundational
export { Button } from './Button';
export { Card, CardBody, CardFooter } from './Card';
export { Input, Textarea, Field } from './Input';

// Signature elements
export {
  Monogram, Wordmark, Eyebrow, StatusPill, Chip, FooterSignature,
} from './Signature';

// Layout primitives
export {
  Container, Section, Stack, Cluster, Grid, Divider, AspectRatio, Spacer,
} from './Layout';

// Navigation
export {
  Nav, Footer, Link, Breadcrumb, Avatar,
} from './Navigation';

// Content display
export {
  Quote, Stat, ImageWithCaption, DefList, Kbd, CodeBlock, Hero,
} from './Content';

// Forms
export {
  Checkbox, Radio, Switch, Select, SearchInput, Slider,
} from './Forms';

// Feedback
export {
  Modal, Toast, Tooltip, Banner, Spinner, Progress,
} from './Feedback';

// Patterns
export {
  Accordion, AccordionItem, Tabs, Pagination,
  EmptyState, Skeleton, SkeletonCard, DataTable,
} from './Patterns';

// Charts
export {
  WaffleChart, BarChart, Sparkline, ProgressRing,
} from './Charts';
