const Journal = require('../models/journal.model');

// Get all journals for the logged-in user
exports.getAllJournals = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    let query = { user: userId };
    
    // Handle search
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }
    
    // Handle tag filtering
    if (req.query.tag) {
      query.tags = req.query.tag;
    }
    
    // Handle mood filtering
    if (req.query.mood) {
      query.mood = req.query.mood;
    }
    
    const journals = await Journal.find(query).sort({ createdAt: -1 });
    
    res.render('journal/index', {
      journals,
      search: req.query.search || '',
      tag: req.query.tag || '',
      mood: req.query.mood || ''
    });
  } catch (error) {
    next(error);
  }
};

// Render the create journal page
exports.getCreatePage = (req, res) => {
  res.render('journal/create');
};

// Create a new journal entry
exports.createJournal = async (req, res, next) => {
  try {
    const { title, content, tags, mood, isPrivate } = req.body;
    const userId = req.session.user._id;
    
    // Process tags (convert comma-separated string to array)
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
    
    const journal = new Journal({
      title,
      content,
      user: userId,
      tags: tagsArray,
      mood: mood || 'neutral',
      isPrivate: isPrivate === 'on'
    });
    
    await journal.save();
    
    res.redirect('/journal');
  } catch (error) {
    next(error);
  }
};

// Get a specific journal entry
exports.getJournal = async (req, res, next) => {
  try {
    const journalId = req.params.id;
    const userId = req.session.user._id;
    
    const journal = await Journal.findOne({
      _id: journalId,
      user: userId
    });
    
    if (!journal) {
      return res.status(404).render('error', {
        message: 'Journal entry not found',
        error: {}
      });
    }
    
    res.render('journal/view', { journal });
  } catch (error) {
    next(error);
  }
};

// Render the edit journal page
exports.getEditPage = async (req, res, next) => {
  try {
    const journalId = req.params.id;
    const userId = req.session.user._id;
    
    const journal = await Journal.findOne({
      _id: journalId,
      user: userId
    });
    
    if (!journal) {
      return res.status(404).render('error', {
        message: 'Journal entry not found',
        error: {}
      });
    }
    
    res.render('journal/edit', { journal });
  } catch (error) {
    next(error);
  }
};

// Update a journal entry
exports.updateJournal = async (req, res, next) => {
  try {
    const journalId = req.params.id;
    const userId = req.session.user._id;
    const { title, content, tags, mood, isPrivate } = req.body;
    
    // Process tags
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
    
    const journal = await Journal.findOneAndUpdate(
      {
        _id: journalId,
        user: userId
      },
      {
        title,
        content,
        tags: tagsArray,
        mood: mood || 'neutral',
        isPrivate: isPrivate === 'on'
      },
      { new: true }
    );
    
    if (!journal) {
      return res.status(404).render('error', {
        message: 'Journal entry not found',
        error: {}
      });
    }
    
    res.redirect(`/journal/${journalId}`);
  } catch (error) {
    next(error);
  }
};

// Delete a journal entry
exports.deleteJournal = async (req, res, next) => {
  try {
    const journalId = req.params.id;
    const userId = req.session.user._id;
    
    const result = await Journal.findOneAndDelete({
      _id: journalId,
      user: userId
    });
    
    if (!result) {
      return res.status(404).render('error', {
        message: 'Journal entry not found',
        error: {}
      });
    }
    
    res.redirect('/journal');
  } catch (error) {
    next(error);
  }
};