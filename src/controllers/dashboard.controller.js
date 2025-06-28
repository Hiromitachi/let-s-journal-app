const Journal = require('../models/journal.model');

// Get dashboard with statistics
exports.getDashboard = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    
    // Get recent entries
    const recentEntries = await Journal.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Get total count
    const totalEntries = await Journal.countDocuments({ user: userId });
    
    // Get mood distribution
    const moodCounts = await Journal.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$mood', count: { $sum: 1 } } }
    ]);
    
    // Get tag distribution (top 10)
    const tagCounts = await Journal.aggregate([
      { $match: { user: userId } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    
    // Get entries by month (for charts)
    const entriesByMonth = await Journal.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: { 
            year: { $year: '$createdAt' }, 
            month: { $month: '$createdAt' } 
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    
    res.render('dashboard', {
      recentEntries,
      totalEntries,
      moodCounts,
      tagCounts,
      entriesByMonth
    });
  } catch (error) {
    next(error);
  }
};