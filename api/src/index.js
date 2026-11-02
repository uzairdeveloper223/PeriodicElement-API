// Cloudflare Worker for Periodic Elements API

// Import the periodic table data
import periodicData from './data.json';

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle preflight CORS requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: corsHeaders
      });
    }

    // Only handle GET requests to /api endpoint
    if (request.method !== 'GET' || url.pathname !== '/api') {
      return new Response('Not Found', { 
        status: 404,
        headers: corsHeaders 
      });
    }

    try {
      const response = await handleApiRequest(url);
      return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }
  }
};

async function handleApiRequest(url) {
  const searchParams = url.searchParams;
  
  // Get query parameters
  const symbol = searchParams.get('symbol');
  const name = searchParams.get('name');
  const number = searchParams.get('number');
  const summaryOnly = searchParams.get('summaryOnly')?.toLowerCase() === 'true';
  const getAll = searchParams.get('all')?.toLowerCase() === 'true';
  const randomElement = searchParams.get('random')?.toLowerCase() === 'true';

  // Validate data structure
  if (!periodicData.elements || !Array.isArray(periodicData.elements)) {
    throw new Error('Invalid data format! Expected a dictionary with an "elements" list.');
  }

  const periodicTable = periodicData.elements;

  // Get all elements
  if (getAll) {
    return periodicTable;
  }

  // Get a random element
  if (randomElement) {
    const randomIndex = Math.floor(Math.random() * periodicTable.length);
    const randomElem = periodicTable[randomIndex];
    return summaryOnly ? { summary: randomElem.summary } : randomElem;
  }

  // Convert number to integer if provided
  let atomicNumber = null;
  if (number) {
    atomicNumber = parseInt(number);
    if (isNaN(atomicNumber)) {
      throw new Error('Invalid atomic number format.');
    }
  }

  // Search for the element
  for (const element of periodicTable) {
    if (symbol && element.symbol.toLowerCase() === symbol.toLowerCase()) {
      return formatResponse(element, summaryOnly);
    }
    if (name && element.name.toLowerCase() === name.toLowerCase()) {
      return formatResponse(element, summaryOnly);
    }
    if (atomicNumber && element.number === atomicNumber) {
      return formatResponse(element, summaryOnly);
    }
  }

  throw new Error('Element not found!');
}

function formatResponse(element, summaryOnly) {
  if (summaryOnly) {
    return { summary: element.summary };
  }
  
  const response = { ...element };
  response.footer = "Made by Uzair Mughal. If you see a bug or want to request something more, email: contact@uzair.is-a.dev";
  return response;
}
