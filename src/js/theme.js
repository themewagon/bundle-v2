import { docReady } from './utils';
import detectorInit from './detector';
import scrollToTop from './scroll-to-top';
import isotopeFilter from './isotope';

/* -------------------------------------------------------------------------- */
/*                            Theme Initialization                            */
/* -------------------------------------------------------------------------- */

docReady(detectorInit);
docReady(scrollToTop);
docReady(isotopeFilter);
