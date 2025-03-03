import express from 'express'; 
import puppeteer from 'puppeteer'; 

const app = express(); 
const port = 3001;

app.use(express.json());

// Handle GET request to the root
app.get('/', (req, res) => {
    res.send('Server is running. Please make a POST request to /render-latex with content.');
});

app.post('/render-latex', async (req, res) => { 
    const { content } = req.body; 

    try { 
        const browser = await puppeteer.launch(); 
        const page = await browser.newPage(); 

        // Use a LaTeX-to-HTML service or template
        await page.setContent(`
            <html>
                <head>
                    <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
                </head>
                <body>
                    <div id="content">${content}</div>
                </body>
            </html>
        `); 

        // Wait for MathJax to render
        await page.waitForSelector('#content', { visible: true }); 

        // Get the rendered HTML
        const renderedHTML = await page.evaluate(() => { 
            return document.getElementById('content').innerHTML; 
        }); 

        await browser.close(); 

        res.json({ success: true, html: renderedHTML }); 
    } catch (error) { 
        console.error('Error rendering LaTeX:', error); 
        res.status(500).json({ success: false, error: 'Failed to render LaTeX' }); 
    } 
});

app.listen(port, () => { 
    console.log(`Server running at http://localhost:${port}`); 
});
