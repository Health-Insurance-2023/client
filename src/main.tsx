import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '@material-tailwind/react'
import AppProvider from './contexts/app.context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import 'src/assets/css/app.css'
// Import Swiper styles
import 'swiper/css'

// Tắt tự động fetch api khi focus vào window
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

const theme = {
  dialog: {
    styles: {
      base: {
        backdrop: {
          backgroundColor: 'bg-[#f3f3f4]',
          backgroundOpacity: 'bg-opacity-80',
          backdropFilter: ''
        },
        container: {
          fontFamily: 'ui-sans-serif',
          color: ''
        }
      },
      sizes: {
        xs: {
          width: '',
          minWidth: '',
          maxWidth: ''
        },
        sm: {
          width: 'w-full md:w-2/3 lg:w-2/4 2xl:w-1/3',
          minWidth: 'min-w-[80%] md:min-w-[66.666667%] lg:min-w-[10%] 2xl:min-w-[10%]',
          maxWidth: 'max-w-[80%] md:max-w-[66.666667%] lg:max-w-[33.3%] 2xl:max-w-[28%]'
        }
      }
    }
  },
  dialogBody: {
    defaultProps: {
      className: '',
      divider: false
    },
    styles: {
      base: {
        initial: {
          color: '',
          fontSmoothing: 'antialiased',
          fontFamily: 'ui-sans-serif',
          fontWeight: 'font-normal',
          lineHeight: 'leading-relaxed'
        }
      }
    }
  },
  dialogFooter: {
    defaultProps: {
      className: ''
    },
    styles: {
      base: {
        fontSmoothing: 'antialiased',
        fontFamily: 'font-sans',
        fontSize: 'text-base',
        fontWeight: 'font-light',
        lineHeight: 'leading-relaxed',
        flexShrink: 'shrink'
      }
    }
  },
  input: {
    styles: {
      base: {
        container: {
          position: 'relative',
          width: 'w-full',
          minWidth: 'min-w-[100px]'
        }
      }
    }
  },
  cardBody: {
    styles: {
      base: {
        p: 'p-4'
      }
    }
  },
  menu: {
    styles: {
      base: {
        menu: {
          minWidth: 'min-w-[50px]'
        }
      }
    }
  },
  select: {
    styles: {
      base: {
        container: {
          minWidth: 'min-w-[50px]'
        }
      }
    }
  },
  tab: {
    styles: {
      base: {
        tab: {
          initial: {
            width: 'w-full',
            height: 'h-full',
            position: 'relative',
            bg: 'bg-transparent',
            py: '',
            px: '',
            color: 'text-blue-gray-900',
            fontSmoothing: 'antialiased',
            fontFamily: 'font-sans',
            fontSize: 'text-base',
            fontWeight: 'font-normal',
            lineHeight: 'leading-relaxed',
            userSelect: 'select-none',
            cursor: 'cursor-pointer'
          }
        }
      }
    }
  },
  tabsHeader: {
    defaultProps: {
      className: ''
    },
    styles: {
      base: {
        display: 'flex',
        position: 'relative',
        bg: 'bg-blue-gray-50',
        bgOpacity: 'bg-opacity-60',
        borderRadius: 'rounded-lg',
        p: 'p-1'
      },
      horizontal: {
        flexDirection: 'flex-row'
      },
      vertical: {
        flexDirection: 'flex-col'
      }
    }
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <AppProvider>
              <HelmetProvider>
                <ThemeProvider value={theme}>
                  <App />
                </ThemeProvider>
              </HelmetProvider>
            </AppProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
